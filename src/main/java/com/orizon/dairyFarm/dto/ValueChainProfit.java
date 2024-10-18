package com.orizon.dairyFarm.dto;

import lombok.Data;


@Data
public class ValueChainProfit {
    private Long valueChainId;
    private Double totalIncome;
    private Double totalExpense;

    public ValueChainProfit(Long valueChainId, Double totalIncome, Double totalExpense) {
        this.valueChainId = valueChainId;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
    }
}
