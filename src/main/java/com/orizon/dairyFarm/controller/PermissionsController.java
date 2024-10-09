package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.PermissionsRequest;
import com.orizon.dairyFarm.request.RolesRequest;
import com.orizon.dairyFarm.service.PermissionsService;
import com.orizon.dairyFarm.tables.LivestockTypes;
import com.orizon.dairyFarm.tables.Permissions;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/permissions")
public class PermissionsController {
    private final PermissionsService permissionsService;
    @PostMapping()
    public void addPermissions(@RequestBody PermissionsRequest permissionsRequest) {
         permissionsService.addPermissions(permissionsRequest);
    }
    @GetMapping()
    public List<Permissions> getPermissions() {
        return permissionsService.getPermissions();
    }
}
