package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Cattle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CattleRepo extends JpaRepository<Cattle,Long> {
}
