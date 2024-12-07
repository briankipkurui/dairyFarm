package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.LivestockTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LivestockTypeRepo extends JpaRepository<LivestockTypes,Long>, JpaSpecificationExecutor<LivestockTypes> {
    @Query("SELECT p FROM LivestockTypes  p WHERE p.name LIKE CONCAT('%',:query,'%')")
    List<LivestockTypes> searchLivestock(String query);


    @Query("SELECT p FROM LivestockTypes  p WHERE p.id = ?1")
    List<LivestockTypes> findLiveStockByLiveStockId(Long liveStockId);
}
