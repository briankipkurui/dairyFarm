package com.orizon.dairyFarm.filtrerResponse;

import lombok.Data;

@Data
public class Filter {
    private String field;
    private String condition;
    private Object value;
}
