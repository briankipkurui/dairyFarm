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
public class RoleId implements Serializable {
    @Column(
            name = "application_user_id"
    )
    private Long applicationUserId;
    @Column(
            name = "role_id"
    )
    private Long roleId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoleId roleId1 = (RoleId) o;
        return Objects.equals(applicationUserId, roleId1.applicationUserId) && Objects.equals(roleId, roleId1.roleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(applicationUserId, roleId);
    }
}
