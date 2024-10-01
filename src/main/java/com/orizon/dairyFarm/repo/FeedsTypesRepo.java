package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.FeedsTypes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedsTypesRepo extends JpaRepository<FeedsTypes,Long> {
}
