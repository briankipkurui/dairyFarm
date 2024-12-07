package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.service.LivestockTypeService;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.LivestockTypes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/livestock")
public class LivestockTypeController {
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
    @PostMapping("/filter")
    public List<LivestockTypes> filterValueChainsService(@RequestBody List<Filter> filters) {
        return liveStockTypeService.filterLivestockTypes(filters);
    }

    @GetMapping("/metadata")
    public Map<String, List<String>> getMetadata(){
        return liveStockTypeService.getMetadata();
    }

}
