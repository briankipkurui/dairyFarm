package com.orizon.dairyFarm.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class NetProfitDto {
    private Long valueChainId;
    private Double netProfit;

    public NetProfitDto(Long valueChainId, Double netProfit) {
        this.valueChainId = valueChainId;
        this.netProfit = netProfit;
    }
}
