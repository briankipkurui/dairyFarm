package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Births;
import com.orizon.dairyFarm.tables.Cattle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CattleRepo extends JpaRepository<Cattle,Long> {
    @Query("SELECT p FROM Cattle  p WHERE p.name LIKE CONCAT('%',:query,'%')")
    List<Cattle> searchProduct(String query);

    @Query("SELECT max(p.id) FROM Cattle p")
    Long maxID();

//    Optional<Cattle> findCattleByCattleId(Long cattleId);

    @Query("SELECT p FROM Cattle  p WHERE p.id = ?1")
    List<Cattle> findCattleByCattleId(Long cattleId);



}
