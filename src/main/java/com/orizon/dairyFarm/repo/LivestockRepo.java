package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Livestock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LivestockRepo extends JpaRepository<Livestock,Long> {
    @Query("SELECT p FROM Livestock  p WHERE p.name LIKE CONCAT('%',:query,'%')")
    List<Livestock> searchLivestock(String query);

    @Query("SELECT p FROM Livestock  p WHERE p.id = ?1")
    List<Livestock> findLiveStockByLiveStockId(Long liveStockId);
}
