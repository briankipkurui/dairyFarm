package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.IncomeTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeTypesRepo extends JpaRepository<IncomeTypes,Long> {

}
