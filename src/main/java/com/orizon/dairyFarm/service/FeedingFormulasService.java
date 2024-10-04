package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.FeedingFormulasRepo;
import com.orizon.dairyFarm.repo.FeedsTypesRepo;
import com.orizon.dairyFarm.repo.LivestockTypeRepo;
import com.orizon.dairyFarm.request.FeedingFormulaRequest;
import com.orizon.dairyFarm.tables.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedingFormulasService {
    private final FeedingFormulasRepo feedingFormulasRepo;
    private final LivestockTypeRepo livestockTypeRepo;
    private final FeedsTypesRepo feedsTypesRepo;

    public void addFeedingFormula(FeedingFormulaRequest feedingFormulaRequest,
                                  Long liveStockTypeId,
                                  Long feedTypeId) {
        LivestockTypes livestockTypes = livestockTypeRepo
                .findById(liveStockTypeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("liveStockType with " + liveStockTypeId + " was not found"));

        FeedsTypes feedsTypes = feedsTypesRepo
                .findById(feedTypeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("feedType with " + feedTypeId + " was not found"));

        FeedingFormulas feedingFormulas = new FeedingFormulas(
                new FeedingFormulasIds(livestockTypes.getId(), feedsTypes.getId()),
                livestockTypes,
                feedsTypes,
                feedingFormulaRequest.getQuantityKg(),
                feedingFormulaRequest.getFeedingFrequency(),
                feedingFormulaRequest.getFeedingTime(),
                feedingFormulaRequest.getWaterLiters(),
                feedingFormulaRequest.getSupplements(),
                LocalDateTime.now()
        );
        feedingFormulasRepo.save(feedingFormulas);
    }


    public List<FeedingFormulas> getAllFeedingFormulas() {
        PageRequest pageRequest = PageRequest.of(0, 50, Sort.by("waterLiters").ascending());
        Page<FeedingFormulas> all = feedingFormulasRepo.findAll(pageRequest);
        return all.getContent();
    }
}
