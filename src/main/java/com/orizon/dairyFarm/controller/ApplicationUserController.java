package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.RegistrationRequestApplicationUser;
import com.orizon.dairyFarm.service.ApplicationUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/user")
public class ApplicationUserController {
    private final ApplicationUserService applicationUserService;

    @PostMapping()
    public void registerUser(@RequestBody RegistrationRequestApplicationUser requestApplicationUser) {
        applicationUserService.registerUser(requestApplicationUser);
    }
}
