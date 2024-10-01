package com.orizon.dairyFarm.request;

import lombok.Data;

@Data
public class FeedingFormulaRequest {
    private Double quantity_kg;
    private String feeding_frequency;
    private String feeding_time;
    private Double water_liters;
    private String supplements;
}
