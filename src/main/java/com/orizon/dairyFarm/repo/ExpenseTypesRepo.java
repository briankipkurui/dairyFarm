package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.ExpenseTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseTypesRepo extends JpaRepository<ExpenseTypes,Long> {
}
