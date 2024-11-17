package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.dto.ValueChainProfit;
import com.orizon.dairyFarm.response.IncomeResponse;
import com.orizon.dairyFarm.tables.Incomes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface IncomesRepo extends JpaRepository<Incomes, Long> {

//    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(i.id, SUM(i.amount), SUM(e.amount)) " +
//            "FROM Incomes i LEFT JOIN Expense e ON i.id = e.id " +
//            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
//            "GROUP BY i.valueChains.id")
//    List<ValueChainProfit> findIncomeAndExpensesForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);


//    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(i.valueChains.id, SUM(i.amount), SUM(e.amount)) " +
//            "FROM Incomes i LEFT JOIN Expense e ON e.valueChains.id = i.valueChains.id " +
//            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
//            "GROUP BY i.valueChains.id, i.valueChains.id")
//    List<ValueChainProfit> findIncomeAndExpensesForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    @Query("SELECT new com.orizon.dairyFarm.dto.ValueChainProfit(i.valueChains.id, SUM(i.amount), " +
            "(SELECT SUM(e.amount) FROM Expense e WHERE e.valueChains.id = i.valueChains.id AND e.transactionDate BETWEEN :startOfMonth AND :endOfMonth)) " +
            "FROM Incomes i " +
            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY i.valueChains.id")
    List<ValueChainProfit> findIncomeAndExpensesForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);




//    @Query("SELECT new com.orizon.dairyFarm.response.IncomeRequest(i.valueChains.id,i.valueChains.name,SUM(i.amount)) " +
//            "FROM Incomes i LEFT JOIN Expense e ON i.valueChains.id = e.valueChains.id " +
//            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
//            "GROUP BY i.valueChains.id,i.valueChains.name,i.amount")
//    List<IncomeRequest> getAmountForEachValueChain(LocalDateTime startOfMonth, LocalDateTime endOfMonth);


    @Query("SELECT new com.orizon.dairyFarm.response.IncomeResponse(i.valueChains.id, i.valueChains.name, SUM(i.amount)) " +
            "FROM Incomes i " +
            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY i.valueChains.id, i.valueChains.name")
    List<IncomeResponse> getAmountForEachValueChain(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

//    @Query("SELECT new com.orizon.dairyFarm.response.IncomeResponse(i.valueChains.id, i.valueChains.name, SUM(i.amount)) " +
//            "FROM Incomes i " +
//            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
//            "GROUP BY i.valueChains.id, i.valueChains.name")
//    List<IncomeResponse> getIncomesForSelectedValueChain(LocalDateTime startOfMonth, LocalDateTime endOfMonth,Long valueChainId);

    @Query("SELECT new com.orizon.dairyFarm.response.IncomeResponse(i.valueChains.id, i.valueChains.name, SUM(i.amount)) " +
            "FROM Incomes i " +
            "WHERE i.transactionDate BETWEEN :startOfMonth AND :endOfMonth " +
            "GROUP BY i.valueChains.id, i.valueChains.name")
    List<IncomeResponse> getIncomesForSelectedValueChain(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

}
