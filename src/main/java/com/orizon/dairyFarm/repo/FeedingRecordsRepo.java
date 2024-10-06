package com.orizon.dairyFarm.repo;
import com.orizon.dairyFarm.tables.FeedingRecords;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedingRecordsRepo extends JpaRepository<FeedingRecords,Long> {
}
