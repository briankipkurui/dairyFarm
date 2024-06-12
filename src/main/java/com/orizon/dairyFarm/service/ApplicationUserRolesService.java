package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.ApplicationUserRepo;
import com.orizon.dairyFarm.repo.ApplicationUserRolesRepo;
import com.orizon.dairyFarm.repo.RolesRepo;
import com.orizon.dairyFarm.request.RegistrationRequestOfListOFRoles;
import com.orizon.dairyFarm.tables.ApplicationUser;
import com.orizon.dairyFarm.tables.ApplicationUserRoles;
import com.orizon.dairyFarm.tables.RoleId;
import com.orizon.dairyFarm.tables.Roles;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ApplicationUserRolesService {
    private final ApplicationUserRepo applicationUserRepo;
    private final RolesRepo rolesRepo;
    private final ApplicationUserRolesRepo applicationUserRolesRepo;

    public ApplicationUserRoles addListOfRoleToUser(
            Long id,
            RegistrationRequestOfListOFRoles ids) {
        boolean userExist = applicationUserRepo.findById(id).isPresent();
        if (userExist) {

            for (Long roleId : ids.getIds()) {
                boolean roleIdExist = rolesRepo.findById(roleId).isPresent();
                if (roleIdExist) {
                    ApplicationUser applicationUser = applicationUserRepo.findById(id).orElseThrow();
                    Roles role = rolesRepo.findById(roleId).orElseThrow();
                    ApplicationUserRoles roleToApplicationUser = new ApplicationUserRoles(new RoleId(id, roleId), applicationUser, role);
                    applicationUserRolesRepo.save(roleToApplicationUser);
                    return roleToApplicationUser;
                } else {
                    throw new IllegalStateException("id " + roleId + " does not exist");
                }
            }
        } else {
            throw new IllegalStateException("user does not exist");
        }
        return null;
    }

    public void addRoleToUser(Long applicationUserID, Long roleID) {
        ApplicationUser applicationUser = applicationUserRepo
                .findById(applicationUserID)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("User with " + applicationUserID + " was not found"));

        Roles roles = rolesRepo
                .findById(roleID)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("role with " + roleID + " was not found"));

        ApplicationUserRoles applicationUserRoles = new ApplicationUserRoles(
                new RoleId(applicationUser.getUserId(), roles.getId()),
                applicationUser,
                roles
        );
        applicationUserRolesRepo.save(applicationUserRoles);
    }
}
