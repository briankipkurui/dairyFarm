package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepo extends JpaRepository<Roles,Long> {
    Optional<Roles> findByName(String name);
}
