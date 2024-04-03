package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Births;
import com.orizon.dairyFarm.tables.Cattle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BirthsRepo extends JpaRepository<Births, Long> {
    @Query("SELECT p FROM Births p where p.calve =?1")
    Births findByCalve(Cattle calve);

    @Query(nativeQuery = true, value = "WITH RECURSIVE cow_descendants AS ( " +
            "  SELECT calve_id, cattle_id FROM births WHERE cattle_id = ?1 " +
            "  UNION ALL " +
            "  SELECT  b.calve_id , b.cattle_id FROM births b " +
            "  JOIN cow_descendants cd ON b.cattle_id = cd.calve_id " +
            ") " +
            "SELECT * FROM cow_descendants")
    List<int[]> findDescendantsOfCattle(long cattleId);
    @Query(nativeQuery = true, value = "WITH RECURSIVE cow_descendants AS ( " +
            "  SELECT calve_id, cattle_id FROM births WHERE cattle_id = ?1 " +
            "  UNION " +
            "  SELECT  b.calve_id , b.cattle_id FROM births b " +
            "  JOIN cow_descendants cd ON b.cattle_id = cd.calve_id " +
            ") " +
            "SELECT * FROM cow_descendants")
    List<int[]> findDescendantsOfCattleOneStep(long cattleId);

    @Query(nativeQuery = true, value = "WITH RECURSIVE cow_ancestors AS ( " +
            "  SELECT calve_id, cattle_id FROM births WHERE calve_id = ?1 " +
            "  UNION  " +
            "  SELECT   b.calve_id, b.cattle_id FROM births b " +
            "  JOIN cow_ancestors ca ON   b.calve_id = ca.cattle_id" +
            ") " +
            "SELECT * FROM cow_ancestors")
    List<Object[]> findAncestorsOfCattle(long calveId);

    @Query(nativeQuery = true, value = "WITH RECURSIVE cow_descendants AS ( " +
            "  SELECT calve_id, cattle_id FROM births WHERE calve_id = ?1 " +
            "  UNION ALL " +
            "  SELECT  b.calve_id , b.cattle_id FROM births b " +
            "  JOIN cow_descendants cd ON b.cattle_id = cd.calve_id " +
            ") " +
            "SELECT * FROM cow_descendants")
    List<int[]> findDescendantsOfCattleByCalveId(long calveId);


}
