package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.exception.StudentNotFoundException;
import com.orizon.dairyFarm.filters.BreedsSpecifications;
import com.orizon.dairyFarm.filters.CattleSpecifications;
import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.repo.BreedsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.BreedsRequest;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Cattle;
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
public class BreedsService {
    private final BreedsRepo breedsRepo;
    @Autowired
    private EntityManager entityManager;

    public void addBreeds(BreedsRequest breedsRequest) {
        boolean userExist = breedsRepo
                .findByName(breedsRequest.getName())
                .isPresent();
        if (userExist) {
            throw new IllegalStateException("name already exist");
        }
        Breeds breeds = new Breeds(
                breedsRequest.getName().toUpperCase(),
                breedsRequest.getDescription()
        );
        breedsRepo.save(breeds);
    }

    public List<Breeds> getBreeds() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<Breeds> all = breedsRepo.findAll(Specification.where(null), pageRequest);
        return all.getContent();
    }

    public void updateBreeds(BreedsRequest breedsRequest,Long livestockIdId) {
        Breeds breeds
                = breedsRepo.findById(livestockIdId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("breed with id " +
                        livestockIdId + " was not found"));


        String upperCase = breedsRequest.getName().toUpperCase();
        breeds.setName(upperCase);
        breedsRepo.save(breeds);
    }


    public void deleteBreeds(Long breedId) {
        if (!breedsRepo.existsById(breedId)) {
            throw new StudentNotFoundException(
                    "breed with id " + breedId + " does not exists");
        }
        breedsRepo.deleteById(breedId);
    }

    public List<Breeds> searchBreeds(String query) {
        String newQuery = query.toUpperCase();
        return breedsRepo.searchProduct(newQuery);
    }

    public List<Breeds> findBreedByCattleId(Long breedId) {
        return breedsRepo.findBreedByBreedId(breedId);
    }

    public List<Breeds> filterBreeds(List<Filter> filters) {
        Specification<Breeds> spec = Specification.where(null);
        for (Filter filter : filters) {
            spec = spec.and(BreedsSpecifications.applyFilter(filter.getField(), filter.getCondition(), filter.getValue()));
        }
        return breedsRepo.findAll(spec, Sort.by("name").ascending());
    }

    public Map<String, List<String>> getMetadata() {
        String tableName = "breeds"; // Use your table name here

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
