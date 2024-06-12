package com.orizon.dairyFarm.request;

import lombok.Data;

import java.util.List;

@Data
public class RegistrationRequestOfListOFRoles {
    private List<Long> Ids;
}
