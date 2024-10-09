package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionsRepo extends JpaRepository<Permissions,Long> {
}
