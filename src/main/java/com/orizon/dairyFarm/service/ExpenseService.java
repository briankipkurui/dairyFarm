package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.filters.CattleSpecifications;
import com.orizon.dairyFarm.filters.ExpenseSpecifications;
import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.repo.ExpenseRepo;
import com.orizon.dairyFarm.repo.ExpenseTypesRepo;
import com.orizon.dairyFarm.repo.ValueChainRepo;
import com.orizon.dairyFarm.request.ExpenseRequest;
import com.orizon.dairyFarm.tables.*;
import com.orizon.dairyFarm.utilis.Utilities;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ExpenseService {
    private final ExpenseTypesRepo expenseTypesRepo;
    private final ValueChainRepo valueChainRepo;
    private final ExpenseRepo expenseRepo;
    @Autowired
    private EntityManager entityManager;
    public void addExpense(ExpenseRequest expenseRequest, Long expenseTypeId,Long valueChainsId) {
        ExpenseTypes expenseTypes
                = expenseTypesRepo.findById(expenseTypeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("ExpenseTypes  with id " +
                        expenseTypeId + " was not found"));

        ValueChains valueChains
                = valueChainRepo.findById(valueChainsId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Value Chain  with id " +
                        valueChainsId + " was not found"));

        Expense expense = new Expense(
                expenseTypes,
                valueChains,
                expenseRequest.getAmount(),
                expenseRequest.getDescription(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        expenseRepo.save(expense);
    }

    public List<Expense> getAllExpense() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("amount").ascending());
        Page<Expense> all = expenseRepo.findAll(Specification.where(null), pageRequest);
        return all.getContent();
    }

    public Map<String, Object> getMetadata() {
        String tableName = "expense";

        // Query the schema for column metadata
        List<Object[]> columns = entityManager.createNativeQuery(
                        "SELECT column_name, data_type " +
                                "FROM information_schema.columns " +
                                "WHERE table_name = :tableName"
                )
                .setParameter("tableName", tableName)
                .getResultList();

        // Query foreign key metadata
        List<Object[]> foreignKeys = entityManager.createNativeQuery(
                        "SELECT kcu.column_name, ccu.table_name AS foreign_table_name " +
                                "FROM information_schema.key_column_usage kcu " +
                                "JOIN information_schema.table_constraints tc " +
                                "ON kcu.constraint_name = tc.constraint_name " +
                                "JOIN information_schema.constraint_column_usage ccu " +
                                "ON ccu.constraint_name = tc.constraint_name " +
                                "WHERE tc.table_name = :tableName AND tc.constraint_type = 'FOREIGN KEY'"
                )
                .setParameter("tableName", tableName)
                .getResultList();

        // Map to hold the final metadata
        Map<String, Object> metadata = new HashMap<>();

        // Add main table columns
        for (Object[] column : columns) {
            String columnName = (String) column[0];
            String dataType = (String) column[1];
            // Convert column name to camelCase
            String camelCaseColumnName = Utilities.toCamelCase(columnName);
            if (dataType.equalsIgnoreCase("character varying") || dataType.equalsIgnoreCase("text")) {
                metadata.put(camelCaseColumnName, List.of("Equals", "Contains", "StartsWith"));
            } else if (dataType.equalsIgnoreCase("timestamp without time zone") || dataType.equalsIgnoreCase("date")) {
                metadata.put(camelCaseColumnName, List.of( "Before", "After", "Between"));
            } else if (dataType.equalsIgnoreCase("double precision")) {
                metadata.put(camelCaseColumnName, List.of("Equals", "GreaterThan", "LessThan"));
            }
            // Add more conditions for other data types as needed
        }

        // Add foreign key relationships with their table columns
        for (Object[] foreignKey : foreignKeys) {
            String columnName = (String) foreignKey[0];
            String foreignTableName = (String) foreignKey[1];

            // Fetch columns of the foreign table
            List<Object[]> foreignTableColumns = entityManager.createNativeQuery(
                            "SELECT column_name, data_type " +
                                    "FROM information_schema.columns " +
                                    "WHERE table_name = :foreignTableName"
                    )
                    .setParameter("foreignTableName", foreignTableName)
                    .getResultList();

            // Add foreign table columns with the format `columnName(foreignTable)`
            for (Object[] foreignColumn : foreignTableColumns) {
                String foreignColumnName = (String) foreignColumn[0];
                String foreignColumnDataType = (String) foreignColumn[1];

                String formattedName = Utilities.toCamelCase(foreignColumnName) + "(" + foreignTableName + ")";

                if (foreignColumnDataType.equalsIgnoreCase("character varying") || foreignColumnDataType.equalsIgnoreCase("text")) {
                    metadata.put(formattedName, List.of("Equals", "Contains", "StartsWith"));
                } else if (foreignColumnDataType.equalsIgnoreCase("timestamp without time zone") || foreignColumnDataType.equalsIgnoreCase("date")) {
                    metadata.put(formattedName, List.of( "Before", "After", "Between"));
                }else if (foreignColumnDataType.equalsIgnoreCase("double precision")) {
                    metadata.put(formattedName, List.of("Equals", "GreaterThan", "LessThan"));
                }
            }
        }

        return metadata;
    }

    public List<Expense> filterExpenses(List<Filter> filters) {
        Specification<Expense> spec = Specification.where(null);
        for (Filter filter : filters) {
            spec = spec.and(ExpenseSpecifications.applyFilter(filter.getField(), filter.getCondition(), filter.getValue()));
        }
        return  expenseRepo.findAll(spec);
    }
}
