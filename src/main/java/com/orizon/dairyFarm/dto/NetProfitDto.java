package com.orizon.dairyFarm.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class NetProfitDto {
    private Long valueChainId;
    private Double netProfit;
    private String name;

    public NetProfitDto(Long valueChainId, Double netProfit, String name) {
        this.valueChainId = valueChainId;
        this.netProfit = netProfit;
        this.name = name;
    }
}
