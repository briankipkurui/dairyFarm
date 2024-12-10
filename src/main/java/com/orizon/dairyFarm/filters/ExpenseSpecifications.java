package com.orizon.dairyFarm.filters;

import com.orizon.dairyFarm.tables.Expense;
import com.orizon.dairyFarm.utilis.Utilities;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.*;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Map;

@Component
public class ExpenseSpecifications {

    public static Specification<Expense> applyFilter(String field, String condition, Object value) {
        return (root, query, criteriaBuilder) -> {
            try {
                String trimmedField = Utilities.reverseAndCamelCase(field);
                Path<?> path = getPath(trimmedField, root);
                Class<?> fieldType = path.getJavaType();
                if (fieldType.equals(String.class)) {
                    return handleStringCondition(condition, value, path, criteriaBuilder);
                } else if (fieldType.equals(LocalDateTime.class)) {
                    return processDateCondition(value, condition, path, criteriaBuilder);
                } else {
                    throw new UnsupportedOperationException("Field type not supported: " + fieldType);
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("Error resolving field: " + field, e);
            }
        };
    }


    private static Path<?> getPath(String field, Root<?> root) {
        if (field.contains(".")) {
            String[] parts = field.split("\\.");
            Join<?, ?> join = root.join(parts[0]);
            return join.get(parts[1]);
        } else {
            return root.get(field);
        }
    }
    
    private static Predicate processDateCondition(Object value, String condition, Path<?> path, CriteriaBuilder criteriaBuilder) {
        if (value instanceof String) {
            LocalDateTime localDateTime = LocalDateTime.parse(value + "T00:00:00");
            return handleDateCondition(condition, localDateTime, path, criteriaBuilder);
        } else if (value instanceof Map) {
            Map<?, ?> dateRangeMap = (Map<?, ?>) value;
            Object startValue = dateRangeMap.get("start");
            Object endValue = dateRangeMap.get("end");

            if (startValue != null && endValue != null) {
                LocalDateTime startDate = LocalDateTime.parse(startValue.toString() + "T00:00:00");
                LocalDateTime endDate = LocalDateTime.parse(endValue.toString() + "T00:00:00");
                return handleDateCondition(condition, new DateRange(startDate, endDate), path, criteriaBuilder);
            } else {
                throw new IllegalArgumentException("Both 'start' and 'end' must be provided for a date range");
            }
        } else {
            throw new IllegalArgumentException("Invalid value type for LocalDateTime field");
        }
    }

    private static Predicate handleStringCondition(String condition, Object value, Path<?> path, CriteriaBuilder criteriaBuilder) {
        switch (condition) {
            case "Equals":
                return criteriaBuilder.equal(path, value);
            case "Contains":
                return criteriaBuilder.like(path.as(String.class), "%" + value + "%");
            case "StartsWith":
                return criteriaBuilder.like(path.as(String.class), value + "%");
            default:
                throw new IllegalArgumentException("Invalid condition for String field");
        }
    }

    private static Predicate handleDateCondition(String condition, Object value, Path<?> path, CriteriaBuilder criteriaBuilder) {
        if (value instanceof LocalDateTime) {
            LocalDateTime dateTime = (LocalDateTime) value;
            switch (condition) {
                case "Equals":
                    return criteriaBuilder.equal(path, dateTime);
                case "Before":
                    return criteriaBuilder.lessThan(path.as(LocalDateTime.class), dateTime);
                case "After":
                    return criteriaBuilder.greaterThan(path.as(LocalDateTime.class), dateTime);
                default:
                    throw new IllegalArgumentException("Invalid condition for Date field");
            }
        } else if (value instanceof DateRange) {
            DateRange range = (DateRange) value;
            return criteriaBuilder.between(path.as(LocalDateTime.class), range.getStart(), range.getEnd());
        }
        throw new IllegalArgumentException("Invalid value type for Date condition");
    }

    private static Predicate handleDoubleCondition(String condition, Object value, Path<?> path, CriteriaBuilder criteriaBuilder) {
        if (!(value instanceof Number)) {
            throw new IllegalArgumentException("Value for Double condition must be a number");
        }
        Double numericValue = ((Number) value).doubleValue();
        switch (condition) {
            case "Equals":
                return criteriaBuilder.equal(path, numericValue);
            case "GreaterThan":
                return criteriaBuilder.greaterThan(path.as(Double.class), numericValue);
            case "LessThan":
                return criteriaBuilder.lessThan(path.as(Double.class), numericValue);
            default:
                throw new IllegalArgumentException("Invalid condition for Double field");
        }
    }

    public static class DateRange {
        private LocalDateTime start;
        private LocalDateTime end;

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
