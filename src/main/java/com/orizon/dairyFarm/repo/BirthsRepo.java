package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Births;
import com.orizon.dairyFarm.tables.Cattle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BirthsRepo extends JpaRepository<Births,Long> {
    @Query("SELECT p FROM Births p where p.cattle =?1 AND  p.calve = ?2")
    Births findByCattleAndCalve(Cattle cattle, Cattle calve);
    @Query("SELECT p FROM Births p where p.calve =?1")
    Births findByCalve(Cattle calve);
}
