package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.FeedingFormulas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedingFormulasRepo  extends JpaRepository<FeedingFormulas,Long> {
}
