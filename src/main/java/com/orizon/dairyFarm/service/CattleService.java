package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.filters.CattleSpecifications;
import com.orizon.dairyFarm.filters.ValueChainSpecifications;
import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.repo.BreedsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.repo.LivestockTypeRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.LivestockTypes;
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
public class CattleService {
    private final CattleRepo cattleRepo;
    private final BreedsRepo breedsRepo;
    private final LivestockTypeRepo livestockTypeRepo;
    @Autowired
    private EntityManager entityManager;

    public void addCattle(CattleRequest cattleRequest) {
        Breeds breeds
                = breedsRepo.findById(cattleRequest.getBreedId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("breed with id " +
                        cattleRequest.getBreedId() + " was not found"));

        LivestockTypes livestock
                = livestockTypeRepo.findById(cattleRequest.getLivestockId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock with id " +
                        cattleRequest.getLivestockId() + " was not found"));

        String splitLivestock = Utilities.splitNameIntoSubstring(livestock.getName());
        Long maxId = cattleRepo.maxID();
        if (maxId == null) {
            maxId = 0L;
        }
        maxId += 1;
        int lastTwoDigitsOfYear = Utilities.getLastTwoDigitsOfYear();

        String serialNumber = Utilities.concatenateSerialNumber(splitLivestock, maxId.toString(), String.valueOf(lastTwoDigitsOfYear));
        LocalDateTime dateOfBirth = Utilities.convertStringToLocalDateTime(cattleRequest.getDateOfBirth());
        LocalDateTime dateDewormed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateDewormed());
        LocalDateTime dateServed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateServed());

        Cattle cattle = new Cattle(
                cattleRequest.getName().toUpperCase(),
                cattleRequest.getSex(),
                serialNumber,
                dateOfBirth,
                dateDewormed,
                dateServed,
                breeds,
                livestock
        );
        cattleRepo.save(cattle);
    }

    public List<Cattle> cattleService() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<Cattle> all = cattleRepo.findAll(Specification.where(null), pageRequest);
        return all.getContent();
    }

    public List<Cattle> searchCattle(String query) {
        String newQuery = query.toUpperCase();
        return cattleRepo.searchProduct(newQuery);
    }

    public Long getMaxId() {
        return cattleRepo.maxID();
    }

    public List<Cattle> findCattleByCattleId(Long cattleId) {

        return cattleRepo.findCattleByCattleId(cattleId);
    }

    public void updateCattle(CattleRequest cattleRequest, Long cattleId) {
        System.out.println("this is the cattle id ..............**************-----------" + cattleId);
        Breeds breeds
                = breedsRepo.findById(cattleRequest.getBreedId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("breed with id " +
                        cattleRequest.getBreedId() + " was not found"));

        LivestockTypes livestock
                = livestockTypeRepo.findById(cattleRequest.getLivestockId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock with id " +
                        cattleRequest.getLivestockId() + " was not found"));

        Cattle cattle
                = cattleRepo.findById(cattleId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        cattleId + " was not found"));

        Long id = cattle.getId();
        int lastTwoDigitsOfYear = Utilities.getLastTwoDigitsOfYear();
        String splitLivestock = Utilities.splitNameIntoSubstring(livestock.getName());
        String serialNumber = Utilities.concatenateSerialNumber(splitLivestock, String.valueOf(id), String.valueOf(lastTwoDigitsOfYear));
        LocalDateTime dateOfBirth = Utilities.convertStringToLocalDateTime(cattleRequest.getDateOfBirth());
        LocalDateTime dateDewormed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateDewormed());
        LocalDateTime dateServed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateServed());

        cattle.setName(cattleRequest.getName());
        cattle.setSex(cattleRequest.getSex());
        cattle.setSerialNumber(serialNumber);
        cattle.setDateOfBirth(dateOfBirth);
        cattle.setBreeds(breeds);
        cattle.setLivestockTypes(livestock);
        cattle.setDateDewormed(dateDewormed);
        cattle.setDateServed(dateServed);
        cattleRepo.save(cattle);

    }

    public Map<String, Object> getMetadata() {
        String tableName = "cattle"; // Use your table name here

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
                }
            }
        }

        return metadata;
    }

    public List<Cattle> filterCattle(List<Filter> filters) {
        Specification<Cattle> spec = Specification.where(null);
        for (Filter filter : filters) {
            spec = spec.and(CattleSpecifications.applyFilter(filter.getField(), filter.getCondition(), filter.getValue()));
        }
        return cattleRepo.findAll(spec, Sort.by("name").ascending());
    }
}
