package com.orizon.dairyFarm.request;

import lombok.Data;

@Data
public class FeedsTypeRequest {
    private String name;
    private String description;
    private String proteinPct;
    private String fatPct;
    private String fiberPct;
    private String energy;
    private String costPerKg;
}
