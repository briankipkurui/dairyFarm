package com.orizon.dairyFarm.repo;


import com.orizon.dairyFarm.dto.ValueChainProfit;
import com.orizon.dairyFarm.response.ExpenseResponse;
import com.orizon.dairyFarm.response.IncomeResponse;
import com.orizon.dairyFarm.tables.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense, Long> {
    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(e.valueChains.id, " +
            "(SELECT COALESCE(SUM(i.amount), 0) FROM Incomes i WHERE i.valueChains.id = e.valueChains.id AND i.transactionDate BETWEEN :startOfMonth AND :endOfMonth), " +
            "SUM(e.amount)) " +
            "FROM Expense e " +
            "WHERE e.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY e.valueChains.id")
    List<ValueChainProfit> findIncomeAndExpensesForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(e.valueChains.id, " +
            "(SELECT COALESCE(SUM(i.amount), 0) FROM Incomes i WHERE i.valueChains.id = e.valueChains.id AND i.transactionDate BETWEEN :startOfMonth AND :endOfMonth), " +
            "SUM(e.amount)) " +
            "FROM Expense e " +
            "WHERE e.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY e.valueChains.id")
    List<ValueChainProfit> getNetProfitForSelectedValueChainDateRange(LocalDateTime startOfMonth, LocalDateTime endOfMonth);


    @Query("SELECT new com.orizon.dairyFarm.response.ExpenseResponse(e.valueChains.id, e.valueChains.name, SUM(e.amount)) " +
            "FROM Expense e " +
            "WHERE e.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY e.valueChains.id, e.valueChains.name")
    List<ExpenseResponse> getExpenseForEachValueChain(LocalDateTime startOfMonth, LocalDateTime endOfMonth);


    @Query("SELECT new com.orizon.dairyFarm.response.ExpenseResponse(e.valueChains.id, e.valueChains.name, SUM(e.amount)) " +
            "FROM Expense e " +
            "WHERE e.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY e.valueChains.id, e.valueChains.name")
    List<ExpenseResponse> getExpenseForSelectedValueChain(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

}
