package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Births;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BirthsRepo extends JpaRepository<Births,Long> {
}
