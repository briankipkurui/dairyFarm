package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.dto.NetProfitDto;
import com.orizon.dairyFarm.dto.ValueChainProfit;
import com.orizon.dairyFarm.repo.IncomesRepo;
import com.orizon.dairyFarm.service.DashBoardService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/dashBoard")
public class DashBoardController {
    private final DashBoardService dashBoardService;
    private final IncomesRepo incomesRepo;

    @GetMapping("/net-profit")
    public List<NetProfitDto> getNetProfitForCurrentMonth() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();  // LocalDateTime start
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<ValueChainProfit> valueChainProfits = incomesRepo.findIncomeAndExpensesForMonth(startOfMonth, endOfMonth);
        return valueChainProfits.stream().map(this::calculateNetProfit).collect(Collectors.toList());
    }

    private NetProfitDto calculateNetProfit(ValueChainProfit valueChainProfit) {
        Double income = valueChainProfit.getTotalIncome();
        Double expense = valueChainProfit.getTotalExpense();
        Double netProfit = income - expense;
        return new NetProfitDto(valueChainProfit.getValueChainId(), netProfit);
    }

    @GetMapping("test")
    public List<ValueChainProfit> gehahaha() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();  // LocalDateTime start
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);
        return incomesRepo.findIncomeAndExpensesForMonth(startOfMonth, endOfMonth);
    }

}
