package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationUserRepo extends JpaRepository<ApplicationUser,Long> {
    Optional<ApplicationUser> findByEmail(String email);
}
