package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.filters.ValueChainSpecifications;
import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.repo.ValueChainRepo;
import com.orizon.dairyFarm.request.ValueChainRequest;
import com.orizon.dairyFarm.tables.Incomes;
import com.orizon.dairyFarm.tables.ValueChains;
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
public class ValueChainsService {
    private final ValueChainRepo valueChainRepo;
    private final ValueChainSpecifications valueChainSpecifications;
    @Autowired
    private EntityManager entityManager;

    public void addValueChain(ValueChainRequest valueChainRequest) {
        ValueChains valueChains = new ValueChains(
                valueChainRequest.getName(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        valueChainRepo.save(valueChains);
    }

    public List<ValueChains> getValueChains() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<ValueChains> all = valueChainRepo.findAll(Specification.where(null), pageRequest);
        return all.getContent();
    }

    public List<ValueChains> searchValueChains(String query) {
        return valueChainRepo.searchValueChains(query);
    }

    public List<ValueChains> filterValueChainsService(List<Filter> filters) {
        Specification<ValueChains> spec = Specification.where(null);
        for (Filter filter : filters) {
            spec = spec.and(ValueChainSpecifications.applyFilter(filter.getField(), filter.getCondition(), filter.getValue()));
        }
        return valueChainRepo.findAll(spec, Sort.by("name").ascending());
    }

    public Map<String, List<String>> getMetadata() {
        String tableName = "value_chains"; // Use your table name here

        // Query the schema for column metadata
        List<Object[]> columns = entityManager.createNativeQuery(
                        "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = :tableName"
                )
                .setParameter("tableName", tableName)
                .getResultList();

        // Map columns to conditions based on data type
        Map<String, List<String>> metadata = new HashMap<>();
        for (Object[] column : columns) {
            String columnName = (String) column[0];
            String dataType = (String) column[1];

            // Convert column name to camelCase
            String camelCaseColumnName = Utilities.toCamelCase(columnName);

            if (dataType.equalsIgnoreCase("character varying") || dataType.equalsIgnoreCase("text")) {
                metadata.put(camelCaseColumnName, List.of("Equals", "Contains", "StartsWith"));
            } else if (dataType.equalsIgnoreCase("timestamp without time zone") || dataType.equalsIgnoreCase("date")) {
                metadata.put(camelCaseColumnName, List.of("Equals", "Before", "After", "Between"));
            }
            // Add more conditions for other data types as needed
        }

        return metadata;
    }
}
