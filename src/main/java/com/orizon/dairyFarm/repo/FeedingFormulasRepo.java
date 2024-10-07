package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.FeedingFormulas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedingFormulasRepo  extends JpaRepository<FeedingFormulas,Long> {
    @Query("SELECT F FROM FeedingFormulas  F WHERE F.livestockTypes.id = ?1")
    List<FeedingFormulas> getFeedingFormulasByLivestockTypesId(Long LivestockTypesId);

    @Query("SELECT F FROM FeedingFormulas  F WHERE F.feedsTypes.id = ?1")
    List<FeedingFormulas> getFeedingFormulasByFeedTypeId(Long feedTypeId);

    @Query("SELECT F FROM FeedingFormulas  F WHERE F.feedsTypes.name LIKE CONCAT('%',:query,'%')")
    List<FeedingFormulas> searchFeedingFormulas(String query);
}
