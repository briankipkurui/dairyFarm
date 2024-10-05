package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.FeedsTypes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedsTypesRepo extends JpaRepository<FeedsTypes,Long> {
    @Query("SELECT F FROM FeedsTypes  F WHERE F.name LIKE CONCAT('%',:query,'%')")
    List<FeedsTypes> searchFeedsTypes(String query);
}
