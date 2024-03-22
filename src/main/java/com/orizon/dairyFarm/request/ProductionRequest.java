package com.orizon.dairyFarm.request;

import lombok.Data;

@Data
public class ProductionRequest {
    private Double unit;
    private Long cattleId;
}
