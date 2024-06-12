package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.RolesRepo;
import com.orizon.dairyFarm.request.RolesRequest;
import com.orizon.dairyFarm.tables.Roles;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RolesService {
    private  final RolesRepo rolesRepo;

    public List<Roles> findRoles() {
        return rolesRepo.findAll();
    }

    public String registerRole(RolesRequest rolesRequest) {
        boolean exist=rolesRepo.findByName(rolesRequest.getName()).isPresent();
        if (exist){
            throw new IllegalStateException("name registered");
        }else {
            Roles roles=new Roles(rolesRequest.getName());
            rolesRepo.save(roles);
            return roles.getName();
        }
    }

    public String deleteRole(Long id) {
        boolean exist=rolesRepo.findById(id).isPresent();
        if (exist){
            Roles roles=rolesRepo.findById(id).orElseThrow();
            rolesRepo.deleteById(id);
            return "role "+roles.getName()+" was deleted";
        }else {
            throw new IllegalStateException("does not exist");
        }
    }
}
