package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.service.LivestockTypeService;
import com.orizon.dairyFarm.tables.LivestockTypes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/livestock")
public class LivestockController {
    private final LivestockTypeService liveStockTypeService;

    @PostMapping()
    public void addToLiveStock(@RequestBody LivestockRequest livestockRequest) {
        liveStockTypeService.addToLiveStock(livestockRequest);
    }

    @GetMapping()
    public List<LivestockTypes> getLiveStock() {
        return liveStockTypeService.getLiveStock();
    }

    @PutMapping("{livestockId}")
    public void updateLiveStock(@RequestBody LivestockRequest livestockRequest,
                                @PathVariable("livestockId") Long livestockIdId) {
        liveStockTypeService.updateLiveStock(livestockRequest, livestockIdId);
    }

    @DeleteMapping(path = "{livestockId}")
    public void deleteLivestock(
            @PathVariable("livestockId") Long livestockIdId) {
        liveStockTypeService.deleteLivestock(livestockIdId);
    }

    @GetMapping("search")
    public List<LivestockTypes> searchLivestock(@RequestParam("query") String query) {
        return liveStockTypeService.searchLivestock(query);
    }

    @GetMapping("{liveStockId}")
    public List<LivestockTypes> findLiveStockByLiveStockId(@PathVariable("liveStockId") Long liveStockId) {
        return liveStockTypeService.findLiveStockByLiveStockId(liveStockId);
    }

}
