package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.ProductionRepo;
import com.orizon.dairyFarm.request.ProductionRequest;
import com.orizon.dairyFarm.tables.Production;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ProductionService {
    private final ProductionRepo productionRepo;

    public void addToProduction(ProductionRequest productionRequest) {
        Production production = new Production(
                productionRequest.getUnit(),
                LocalDateTime.now()

        );
        productionRepo.save(production);
    }
}
