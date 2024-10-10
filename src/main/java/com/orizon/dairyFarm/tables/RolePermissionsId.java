package com.orizon.dairyFarm.tables;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RolePermissionsId implements Serializable {
    @Column(
            name = "permission_id"
    )
    private Long permissionId;
    @Column(
            name = "role_id"
    )
    private Long roleId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RolePermissionsId that = (RolePermissionsId) o;
        return Objects.equals(permissionId, that.permissionId) && Objects.equals(roleId, that.roleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(permissionId, roleId);
    }
}
