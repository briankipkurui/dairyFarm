package com.orizon.dairyFarm.request;

import lombok.Data;

@Data
public class FeedingRecordsRequest {
    private Double feedGivenKg;
    private Double waterGivenLiters;
    private String remarks;

}
