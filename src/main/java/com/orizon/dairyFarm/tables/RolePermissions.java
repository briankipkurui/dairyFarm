package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "RolePermissions")
@Table(name = "role_permissions")
public class RolePermissions {
    @EmbeddedId
    private RolePermissionsId rolePermissionsId;

    @ManyToOne(
            cascade = {CascadeType.ALL}
    )
    @MapsId("permissionId")
    @JoinColumn(
            name = "permission_id"
    )
    private Permissions permissions;
    @ManyToOne(
            cascade = {CascadeType.ALL}
    )
    @MapsId("roleId")
    @JoinColumn(
            name = "role_id"
    )
    private Roles roles;

    public RolePermissions(RolePermissionsId rolePermissionsId,
                           Permissions permissions,
                           Roles roles) {
        this.rolePermissionsId = rolePermissionsId;
        this.permissions = permissions;
        this.roles = roles;
    }
}
