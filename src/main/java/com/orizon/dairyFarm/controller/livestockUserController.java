package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.service.LivestockService;
import com.orizon.dairyFarm.tables.Livestock;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/livestock/users")
public class livestockUserController {
    private final LivestockService liveStockService;

    @PostMapping()
    public void addToLiveStock(@RequestBody LivestockRequest livestockRequest) {
        liveStockService.addToLiveStock(livestockRequest);
    }

    @GetMapping()
    public List<Livestock> getLiveStock() {
        return liveStockService.getLiveStock();
    }

    @PutMapping()
    public void updateLiveStock(@RequestBody LivestockRequest livestockRequest) {
        liveStockService.updateLiveStock(livestockRequest);
    }

    @DeleteMapping(path = "{livestockId}")
    public void deleteLivestock(
            @PathVariable("livestockId") Long livestockIdId) {
        liveStockService.deleteLivestock(livestockIdId);
    }
    @GetMapping("search")
    public List<Livestock> searchLivestock(@RequestParam("query") String query) {
        return liveStockService.searchLivestock(query);
    }

    @GetMapping("{liveStockId}")
    public List<Livestock> findLiveStockByLiveStockId(@PathVariable("liveStockId") Long liveStockId) {
        return liveStockService.findLiveStockByLiveStockId(liveStockId);
    }

}
