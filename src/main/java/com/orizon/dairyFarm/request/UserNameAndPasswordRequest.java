package com.orizon.dairyFarm.request;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserNameAndPasswordRequest {
    private String userName;
    private String password;
}
