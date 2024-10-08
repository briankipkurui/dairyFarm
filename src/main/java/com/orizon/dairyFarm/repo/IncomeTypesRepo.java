package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.IncomeTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IncomeTypesRepo extends JpaRepository<IncomeTypes,Long> {
    @Query("SELECT IT FROM IncomeTypes IT WHERE LOWER(IT.name) LIKE LOWER(CONCAT('%',:query,'%'))")
    List<IncomeTypes> searchIncomesTypes(String query);
}
