package com.orizon.dairyFarm.request;

import lombok.Data;

@Data
public class ExpenseRequest {
    private Double amount;
    private String description;
}
