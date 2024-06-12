package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.RegistrationRequestOfListOFRoles;
import com.orizon.dairyFarm.service.ApplicationUserRolesService;
import com.orizon.dairyFarm.tables.ApplicationUserRoles;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/userRoles")
public class ApplicationUserRolesController {
    private final ApplicationUserRolesService applicationUserRolesService;


    @PostMapping("addRoleToUser/{applicationUserID}/{roleID}")
    public void addRoleToUser(@PathVariable("applicationUserID") Long applicationUserID,
                              @PathVariable("roleID") Long roleID ){
        applicationUserRolesService.addRoleToUser(applicationUserID,roleID);
    }
}
