package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.RolePermissions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolePermissionsRepo extends JpaRepository<RolePermissions,Long> {
}
