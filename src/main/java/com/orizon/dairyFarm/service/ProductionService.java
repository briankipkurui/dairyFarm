package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.repo.ProductionRepo;
import com.orizon.dairyFarm.request.ProductionRequest;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.Production;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductionService {
    private final ProductionRepo productionRepo;
    private final CattleRepo cattleRepo;

    public void addToProduction(ProductionRequest productionRequest) {

        Cattle cattle
                = cattleRepo.findById(productionRequest.getCattleId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        productionRequest.getCattleId() + " was not found"));

        Production production = new Production(
                productionRequest.getUnit(),
                LocalDateTime.now(),
                cattle
        );
        productionRepo.save(production);
    }

    public List<Production> getProduction() {
        return productionRepo.findAll();
    }
}
