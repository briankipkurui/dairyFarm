package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.FeedsTypeRequest;
import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.service.FeedsTypesService;
import com.orizon.dairyFarm.tables.FeedsTypes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/feedsTypes")
public class FeedsTypeController {
    private final FeedsTypesService feedsTypesService;

    @PostMapping()
    public void addFeedsTypes(@RequestBody FeedsTypeRequest feedsTypeRequest) {
        feedsTypesService.addToLiveStock(feedsTypeRequest);
    }

    @GetMapping()
    public List<FeedsTypes> getAllFeedsTypes() {
        return feedsTypesService.getAllFeedsTypes();
    }
    @GetMapping("search")
    public List<FeedsTypes> searchFeedsTypes(@RequestParam("query") String query) {
        return feedsTypesService.searchFeedsTypes(query);
    }

}
