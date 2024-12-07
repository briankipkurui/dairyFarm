package com.orizon.dairyFarm.filters;

import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.utilis.Utilities;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Map;

@Component
public class BreedsSpecifications {

    public static Specification<Breeds> applyFilter(String field, String condition, Object value) {
        return (root, query, criteriaBuilder) -> {
            try {
                // Remove brackets if present
                String trimmedField = Utilities.reverseAndCamelCase(field);
                System.out.println("Trimmed field: " + trimmedField);

                // Handle join fields
                Path<?> path;
                if (trimmedField.contains(".")) {
                    // Split field to find join path
                    String[] parts = trimmedField.split("\\.");
                    Join<Object, Object> join = root.join(parts[0]);
                    path = join.get(parts[1]);
                } else {
                    path = root.get(trimmedField);
                }

                // Determine the field type using reflection
                Field fieldInEntity;
                if (trimmedField.contains(".")) {
                    // Handle nested fields
                    String entityField = trimmedField.split("\\.")[1];
                    fieldInEntity = Breeds.class.getDeclaredField(entityField);
                } else {
                    fieldInEntity = Breeds.class.getDeclaredField(trimmedField);
                }
                fieldInEntity.setAccessible(true);

                // Process based on field type
                if (fieldInEntity.getType().equals(String.class)) {
                    return handleStringCondition(condition, value, path, criteriaBuilder);
                } else if (fieldInEntity.getType().equals(LocalDateTime.class)) {
                    return processDateCondition(value, condition, path, criteriaBuilder);
                } else {
                    throw new IllegalArgumentException("Unsupported field type for filtering");
                }
            } catch (NoSuchFieldException e) {
                throw new IllegalArgumentException("Invalid field: " + field, e);
            }
        };
    }

    private static Predicate processDateCondition(Object value, String condition, Path<?> path, CriteriaBuilder criteriaBuilder) {
        if (value instanceof String) {
            // Parse single date
            LocalDateTime localDateTime = LocalDateTime.parse(value + "T00:00:00");
            return handleDateCondition(condition, localDateTime, path, criteriaBuilder);
        } else if (value instanceof Map) {
            // Parse date range
            Map<?, ?> dateRangeMap = (Map<?, ?>) value;
            Object startValue = dateRangeMap.get("start");
            Object endValue = dateRangeMap.get("end");

            if (startValue != null && endValue != null) {
                LocalDateTime startDateTime = LocalDateTime.parse(startValue.toString() + "T00:00:00");
                LocalDateTime endDateTime = LocalDateTime.parse(endValue.toString() + "T00:00:00");
                return handleDateCondition(condition, new DateRange(startDateTime, endDateTime), path, criteriaBuilder);
            } else {
                throw new IllegalArgumentException("Both 'start' and 'end' must be provided for a date range");
            }
        } else {
            throw new IllegalArgumentException("Invalid value type for LocalDateTime field");
        }
    }

    private static Predicate handleStringCondition(String condition, Object value, Path<?> path, CriteriaBuilder criteriaBuilder) {
        if (condition.equals("Equals")) {
            return criteriaBuilder.equal(path, value);
        } else if (condition.equals("Contains")) {
            return criteriaBuilder.like(path.as(String.class), "%" + value + "%");
        } else if (condition.equals("StartsWith")) {
            return criteriaBuilder.like(path.as(String.class), value + "%");
        }
        throw new IllegalArgumentException("Invalid condition for String field");
    }

    private static Predicate handleDateCondition(String condition, Object value, Path<?> path, CriteriaBuilder criteriaBuilder) {
        if (condition.equals("Equals")) {
            return criteriaBuilder.equal(path, value);
        } else if (condition.equals("Before")) {
            return criteriaBuilder.lessThan(path.as(LocalDateTime.class), (LocalDateTime) value);
        } else if (condition.equals("After")) {
            return criteriaBuilder.greaterThan(path.as(LocalDateTime.class), (LocalDateTime) value);
        } else if (condition.equals("Between") && value instanceof DateRange) {
            DateRange dateRange = (DateRange) value;
            return criteriaBuilder.between(path.as(LocalDateTime.class), dateRange.getStart(), dateRange.getEnd());
        }
        throw new IllegalArgumentException("Invalid condition for Date field");
    }

    public static class DateRange {
        private LocalDateTime start;
        private LocalDateTime end;

        // Constructors, getters, and setters
        public DateRange(LocalDateTime start, LocalDateTime end) {
            this.start = start;
            this.end = end;
        }

        public LocalDateTime getStart() {
            return start;
        }

        public void setStart(LocalDateTime start) {
            this.start = start;
        }

        public LocalDateTime getEnd() {
            return end;
        }

        public void setEnd(LocalDateTime end) {
            this.end = end;
        }
    }
}

