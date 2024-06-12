package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.RolesRequest;
import com.orizon.dairyFarm.service.RolesService;
import com.orizon.dairyFarm.tables.Roles;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/roles")
public class RolesController {
    private RolesService rolesService;

    @GetMapping()
    public List<Roles> findRoles() {
        return rolesService.findRoles();
    }

    @PostMapping()
    public String registerRole(@RequestBody RolesRequest rolesRequest) {
        return rolesService.registerRole(rolesRequest);
    }

    @DeleteMapping("/{id}")
    public String deleteRole(@PathVariable(name = "id") Long id) {
        return rolesService.deleteRole(id);
    }

}
