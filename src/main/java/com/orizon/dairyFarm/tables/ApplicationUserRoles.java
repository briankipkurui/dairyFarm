package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "ApplicationUserRoles")
@Table(name = "application_user_roles")
public class ApplicationUserRoles {
    @EmbeddedId
    private RoleId rolesId;

    @ManyToOne(
            cascade = {CascadeType.ALL}
    )
    @JsonBackReference
    @MapsId("applicationUserId")
    @JoinColumn(
            name = "application_user_id"
    )
    private ApplicationUser applicationUser;
    @ManyToOne(
            cascade = {CascadeType.ALL}
    )
    @JsonBackReference
    @MapsId("roleId")
    @JoinColumn(
            name = "role_id"
    )
    private Roles roles;

    public ApplicationUserRoles(
            RoleId rolesId,
            ApplicationUser applicationUser,
            Roles roles) {
        this.rolesId = rolesId;
        this.applicationUser = applicationUser;
        this.roles = roles;
    }
}
