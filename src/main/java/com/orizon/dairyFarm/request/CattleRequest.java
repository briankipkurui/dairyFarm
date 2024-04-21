package com.orizon.dairyFarm.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CattleRequest {
    private String name;
    private String sex;
    private Long breedId;
    private Long livestockId;
    private String dateOfBirth;
    private String DateDewormed;
    private String DateServed;

}
