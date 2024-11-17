package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.dto.NetProfitDto;
import com.orizon.dairyFarm.dto.ValueChainProfit;
import com.orizon.dairyFarm.repo.ExpenseRepo;
import com.orizon.dairyFarm.repo.IncomesRepo;
import com.orizon.dairyFarm.repo.ValueChainRepo;
import com.orizon.dairyFarm.response.ExpenseResponse;
import com.orizon.dairyFarm.response.IncomeResponse;
import com.orizon.dairyFarm.service.DashBoardService;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.ValueChains;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/dashBoard")
public class DashBoardController {
    private final DashBoardService dashBoardService;
    private final IncomesRepo incomesRepo;
    private final ExpenseRepo expenseRepo;
    private final ValueChainRepo valueChainRepo;

    @GetMapping("/net-profit")
    public List<NetProfitDto> getNetProfitForCurrentMonth() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();  // LocalDateTime start
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<ValueChainProfit> valueChainProfits = expenseRepo.findIncomeAndExpensesForMonth(startOfMonth, endOfMonth);
        return valueChainProfits.stream().map(this::calculateNetProfit).collect(Collectors.toList());
    }

    @GetMapping("/net-profit/selectedValueChain")
    public List<NetProfitDto> getNetProfitForSelectedValueChainDateRange
            (
                    @RequestParam("startDate") String startDate,
                    @RequestParam("endDate") String endDate
            ) {
        String from = String.valueOf(startDate);
        String to = String.valueOf(endDate);
        LocalDate fromLocalDate = LocalDate.parse(from);
        LocalDate toLocalDate = LocalDate.parse(to);

        List<ValueChainProfit> valueChainProfits = expenseRepo.getNetProfitForSelectedValueChainDateRange(fromLocalDate.atStartOfDay(), toLocalDate.atTime(LocalTime.MAX));
        return valueChainProfits.stream().map(this::calculateNetProfit).collect(Collectors.toList());
    }

    private NetProfitDto calculateNetProfit(ValueChainProfit valueChainProfit) {
        Double income = valueChainProfit.getTotalIncome();
        Double expense = valueChainProfit.getTotalExpense();
        Double netProfit = income - expense;
        ValueChains valueChains
                = valueChainRepo.findById(valueChainProfit.getValueChainId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Value chain with id " +
                        valueChainProfit.getValueChainId() + " was not found"));
        return new NetProfitDto(valueChainProfit.getValueChainId(), netProfit, valueChains.getName());
    }

    @GetMapping("test")
    public List<ValueChainProfit> gehahaha() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();  // LocalDateTime start
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);
        return expenseRepo.findIncomeAndExpensesForMonth(startOfMonth, endOfMonth);
    }

    @GetMapping("incomes")
    public List<IncomeResponse> getAmountForEachValueChain() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();  // LocalDateTime start
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);
        return incomesRepo.getAmountForEachValueChain(startOfMonth, endOfMonth);
    }

    @GetMapping("incomes/selectedValueChain")
    public List<IncomeResponse> getIncomesForSelectedValueChain
            (
                    @RequestParam("startDate") String startDate,
                    @RequestParam("endDate") String endDate
            ) {
        String from = String.valueOf(startDate);
        String to = String.valueOf(endDate);
        LocalDate fromLocalDate = LocalDate.parse(from);
        LocalDate toLocalDate = LocalDate.parse(to);
        return incomesRepo.getIncomesForSelectedValueChain(fromLocalDate.atStartOfDay(), toLocalDate.atTime(LocalTime.MAX));
    }

    @GetMapping("expense")
    public List<ExpenseResponse> getExpenseForEachValueChain() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();  // LocalDateTime start
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);
        return expenseRepo.getExpenseForEachValueChain(startOfMonth, endOfMonth);
    }

    @GetMapping("expense/selectedValueChain")
    public List<ExpenseResponse> getExpenseForSelectedValueChain
            (
                    @RequestParam("startDate") String startDate,
                    @RequestParam("endDate") String endDate
            ) {
        String from = String.valueOf(startDate);
        String to = String.valueOf(endDate);
        LocalDate fromLocalDate = LocalDate.parse(from);
        LocalDate toLocalDate = LocalDate.parse(to);
        return expenseRepo.getExpenseForSelectedValueChain(fromLocalDate.atStartOfDay(), toLocalDate.atTime(LocalTime.MAX));
    }

}
