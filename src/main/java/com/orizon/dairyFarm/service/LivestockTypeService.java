package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.exception.StudentNotFoundException;
import com.orizon.dairyFarm.filters.BreedsSpecifications;
import com.orizon.dairyFarm.filters.LiveStockTypesSpecifications;
import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.repo.LivestockTypeRepo;
import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.LivestockTypes;
import com.orizon.dairyFarm.utilis.Utilities;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class LivestockTypeService {
    private final LivestockTypeRepo livestockTypeRepo;
    @Autowired
    private EntityManager entityManager;
    public void addToLiveStock(LivestockRequest livestockRequest) {
        LivestockTypes livestock = new LivestockTypes(
                livestockRequest.getName(),
                livestockRequest.getDescription()
        );
        livestockTypeRepo.save(livestock);
    }

    public List<LivestockTypes> getLiveStock() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<LivestockTypes> all = livestockTypeRepo.findAll(Specification.where(null), pageRequest);
        return all.getContent();

    }

    public void updateLiveStock(LivestockRequest livestockRequest,Long livestockIdId) {
        LivestockTypes livestock
                = livestockTypeRepo.findById(livestockIdId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock  with id " +
                        livestockIdId + " was not found"));


        String upperCase = livestockRequest.getName().toUpperCase();
        livestock.setName(upperCase);
        livestockTypeRepo.save(livestock);


    }

    public void deleteLivestock(Long livestockIdId) {
        if (!livestockTypeRepo.existsById(livestockIdId)) {
            throw new StudentNotFoundException(
                    "breed with id " + livestockIdId + " does not exists");
        }
        livestockTypeRepo.deleteById(livestockIdId);
    }

    public List<LivestockTypes> searchLivestock(String query) {
        String newQuery = query.toUpperCase();
        return livestockTypeRepo.searchLivestock(newQuery);
    }

    public List<LivestockTypes> findLiveStockByLiveStockId(Long liveStockId) {
        return livestockTypeRepo.findLiveStockByLiveStockId(liveStockId);
    }

    public List<LivestockTypes> filterLivestockTypes(List<Filter> filters) {
        Specification<LivestockTypes> spec = Specification.where(null);
        for (Filter filter : filters) {
            spec = spec.and(LiveStockTypesSpecifications.applyFilter(filter.getField(), filter.getCondition(), filter.getValue()));
        }
        return livestockTypeRepo.findAll(spec, Sort.by("name").ascending());
    }

    public Map<String, List<String>> getMetadata() {
        String tableName = "livestock_types"; // Use your table name here

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
