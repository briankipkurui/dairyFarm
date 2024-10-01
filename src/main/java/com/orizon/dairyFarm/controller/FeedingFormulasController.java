package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.FeedingFormulaRequest;
import com.orizon.dairyFarm.request.FeedsTypeRequest;
import com.orizon.dairyFarm.service.FeedingFormulasService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/feedingFormulas")
public class FeedingFormulasController {
    private final FeedingFormulasService feedingFormulasService;
    @PostMapping()
    public void addFeedingFormula(@RequestBody FeedingFormulaRequest feedingFormulaRequest) {
        feedingFormulasService.addFeedingFormula(feedingFormulaRequest);
    }
}
