package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.request.FeedingFormulaRequest;
import com.orizon.dairyFarm.tables.FeedingFormulas;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeedingFormulasService {
    public void addFeedingFormula(FeedingFormulaRequest feedingFormulaRequest) {
        FeedingFormulas feedingFormulas = new FeedingFormulas(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
    }
}
