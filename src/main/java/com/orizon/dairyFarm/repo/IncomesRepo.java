package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.dto.ValueChainProfit;
import com.orizon.dairyFarm.tables.Incomes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IncomesRepo extends JpaRepository<Incomes,Long> {

//    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(i.id, SUM(i.amount), SUM(e.amount)) " +
//            "FROM Incomes i LEFT JOIN Expense e ON i.id = e.id " +
//            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
//            "GROUP BY i.valueChains.id")
//    List<ValueChainProfit> findIncomeAndExpensesForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);


    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(i.valueChains.id, SUM(i.amount), SUM(e.amount)) " +
            "FROM Incomes i LEFT JOIN Expense e ON i.id = e.id " +
            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY i.valueChains.id, i.valueChains.id")
    List<ValueChainProfit> findIncomeAndExpensesForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

}
