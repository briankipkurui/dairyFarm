package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Cattle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BreedsRepo extends JpaRepository<Breeds,Long> {
    Optional<Breeds> findByName(String name);
    @Query("SELECT p FROM Breeds  p WHERE p.name LIKE CONCAT('%',:query,'%')")
    List<Breeds> searchProduct(String query);
    @Query("SELECT p FROM Breeds  p WHERE p.breedId = ?1")
    List<Breeds> findBreedByBreedId(Long breedId);
}
