package com.orizon.dairyFarm.repo;


import com.orizon.dairyFarm.tables.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepo extends JpaRepository<Expense,Long> {
}
