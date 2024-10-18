package com.orizon.dairyFarm.response;

import lombok.Data;

@Data
public class IncomeResponse {
    private Long valueChainId;
    private String valueChain;
    private Double amount;

    public IncomeResponse
            (
                    Long valueChainId,
                    String valueChain,
                    Double amount
            ) {
        this.valueChainId = valueChainId;
        this.valueChain = valueChain;
        this.amount = amount;
    }
}
