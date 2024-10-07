package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.repo.FeedingFormulasRepo;
import com.orizon.dairyFarm.request.FeedingFormulaRequest;
import com.orizon.dairyFarm.service.FeedingFormulasService;
import com.orizon.dairyFarm.tables.FeedingFormulas;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/feedingFormulas")
public class FeedingFormulasController {
    private final FeedingFormulasService feedingFormulasService;
    private  final FeedingFormulasRepo feedingFormulasRepo;

    @PostMapping("{liveStockTypeId}/{feedTypeId}")
    public void addFeedingFormula(@RequestBody FeedingFormulaRequest feedingFormulaRequest,
                                  @PathVariable("liveStockTypeId") Long liveStockTypeId,
                                  @PathVariable("feedTypeId") Long feedTypeId) {
        feedingFormulasService.addFeedingFormula(feedingFormulaRequest, liveStockTypeId, feedTypeId);
    }

    @GetMapping()
    public List<FeedingFormulas> getAllFeedingFormulas() {
       return feedingFormulasService.getAllFeedingFormulas();
    }

    @GetMapping("search")
    public List<FeedingFormulas> searchFeedingFormulas(@RequestParam("query") String query) {
        return feedingFormulasService.searchFeedingFormulas(query);
    }

}
