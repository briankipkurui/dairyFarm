package com.orizon.dairyFarm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration
public class PasswordConfig {
    public PasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder(10);
    }

}
