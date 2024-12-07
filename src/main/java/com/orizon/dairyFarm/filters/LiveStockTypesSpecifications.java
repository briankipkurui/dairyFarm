package com.orizon.dairyFarm.filters;

import com.orizon.dairyFarm.tables.LivestockTypes;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.*;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Map;

@Component
public class LiveStockTypesSpecifications {

    public static Specification<LivestockTypes> applyFilter(String field, String condition, Object value) {
        return new Specification<LivestockTypes>() {
            @Override
            public Predicate toPredicate(Root<LivestockTypes> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                try {
                    Field fieldInEntity = LivestockTypes.class.getDeclaredField(field); // Reflective lookup of field
                    fieldInEntity.setAccessible(true); // Make private fields accessible
                    Path<?> path = root.get(field);

                    if (fieldInEntity.getType().equals(String.class)) {
                        return handleStringCondition(condition, value, path, criteriaBuilder);
                    } else if (fieldInEntity.getType().equals(LocalDateTime.class)) {
                        if (value instanceof String) {
                            // Parse single date
                            LocalDateTime localDateTime = LocalDateTime.parse(value + "T00:00:00");
                            return handleDateCondition(condition, localDateTime, path, criteriaBuilder);
                        } else if (value instanceof Map) {
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
                } catch (NoSuchFieldException e) {
                    throw new IllegalArgumentException("Invalid field: " + field, e);
                }

                return null;
            }
        };
    }

    private static Predicate handleStringCondition(String condition, Object value, Path<?> path, CriteriaBuilder criteriaBuilder) {
        Expression<String> processedPath = criteriaBuilder.lower(
                criteriaBuilder.function("REPLACE", String.class, path.as(String.class), criteriaBuilder.literal(" "), criteriaBuilder.literal(""))
        );

        // Remove spaces and make lowercase for input value
        String processedValue = value.toString().replace(" ", "").toLowerCase();
        if (condition.equals("Equals")) {
            return criteriaBuilder.equal(processedPath, processedValue);
        } else if (condition.equals("Contains")) {
            return criteriaBuilder.like(processedPath, "%" + processedValue + "%");
        } else if (condition.equals("StartsWith")) {
            return criteriaBuilder.like(processedPath, processedValue + "%");
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

