package com.orizon.dairyFarm.request;

import com.orizon.dairyFarm.tables.FeedsTypes;
import lombok.Data;

@Data
public class FeedingFormulaRequest {
    private Double quantityKg;
    private String feedingFrequency;
    private String feedingTime;
    private Double waterLiters;
    private String supplements;
}
