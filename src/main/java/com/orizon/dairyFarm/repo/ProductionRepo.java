package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Production;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionRepo extends JpaRepository<Production,Long> {
}
