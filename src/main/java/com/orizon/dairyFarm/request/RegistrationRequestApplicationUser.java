package com.orizon.dairyFarm.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
public class RegistrationRequestApplicationUser {
    private  final Long id;
    private  final  String firstName;
    private  final  String lastName;
    private  final  String phoneNumber;
    private  final  String email;
    private  final  String password;
    private  final  String identificationNumber;
}
