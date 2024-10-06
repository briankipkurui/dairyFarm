package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.repo.FeedingFormulasRepo;
import com.orizon.dairyFarm.repo.FeedingRecordsRepo;
import com.orizon.dairyFarm.request.FeedingRecordsRequest;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.FeedingFormulas;
import com.orizon.dairyFarm.tables.FeedingRecords;
import com.orizon.dairyFarm.tables.FeedsTypes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedingRecordsService {
    private final FeedingFormulasRepo feedingFormulasRepo;
    private final CattleRepo cattleRepo;
    private final FeedingRecordsRepo feedingRecordsRepo;

    public void addFeedingRecord(FeedingRecordsRequest feedingFormulaRequest,
                                 Long feedingFormulaId,
                                 Long cattleId) {

        FeedingFormulas feedingFormulas = feedingFormulasRepo
                .findById(feedingFormulaId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("feeding formula  with  id" + feedingFormulaId + " was not found"));

        Cattle cattle = cattleRepo
                .findById(cattleId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle   with  id" + cattleId + " was not found"));


        FeedingRecords feedingRecords = new FeedingRecords(
                feedingFormulas,
                cattle,
                feedingFormulaRequest.getFeedGivenKg(),
                feedingFormulaRequest.getWaterGivenLiters(),
                feedingFormulaRequest.getRemarks(),
                LocalDateTime.now()
        );
       feedingRecordsRepo.save(feedingRecords);
    }

    public List<FeedingRecords> getAllFeedingRecords() {
        PageRequest pageRequest = PageRequest.of(0, 50, Sort.by("waterGivenLiters").ascending());
        Page<FeedingRecords> all = feedingRecordsRepo.findAll(pageRequest);
        return all.getContent();
    }
}
