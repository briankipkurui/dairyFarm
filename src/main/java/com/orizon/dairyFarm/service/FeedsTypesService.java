package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.FeedsTypesRepo;
import com.orizon.dairyFarm.request.FeedsTypeRequest;
import com.orizon.dairyFarm.tables.FeedsTypes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FeedsTypesService {
    private  final FeedsTypesRepo feedsTypesRepo;
    public void addToLiveStock(FeedsTypeRequest feedsTypeRequest) {

        FeedsTypes feedsTypes = new FeedsTypes(
                feedsTypeRequest.getName(),
                feedsTypeRequest.getDescription(),
                feedsTypeRequest.getProteinPct(),
                feedsTypeRequest.getFatPct(),
                feedsTypeRequest.getFiberPct(),
                feedsTypeRequest.getEnergy(),
                feedsTypeRequest.getCostPerKg()
        );
        feedsTypesRepo.save(feedsTypes);
     }

    public List<FeedsTypes> getAllFeedsTypes() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<FeedsTypes> all = feedsTypesRepo.findAll(pageRequest);
        return all.getContent();
    }

    public List<FeedsTypes> searchFeedsTypes(String query) {
        return feedsTypesRepo.searchFeedsTypes(query);
    }
}
