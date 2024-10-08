package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.ExpenseTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseTypesRepo extends JpaRepository<ExpenseTypes,Long> {
    @Query("SELECT ET FROM ExpenseTypes ET WHERE LOWER(ET.name) LIKE LOWER(CONCAT('%',:query,'%'))")
    List<ExpenseTypes> searchIncomesTypes(String query);

}
