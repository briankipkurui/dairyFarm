package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.service.CattleService;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.ValueChains;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/cattle")
public class CattleController {
    private final CattleService cattleService;
    private final CattleRepo cattleRepo;

    @PostMapping()
    public void addCattle(@RequestBody CattleRequest cattleRequest) {
        cattleService.addCattle(cattleRequest);
    }

    @GetMapping()
    public List<Cattle> cattleService() {
        return cattleService.cattleService();
    }

    @GetMapping("{cattleId}")
    public List<Cattle> findCattleByCattleId(@PathVariable("cattleId") Long cattleId) {
        return cattleService.findCattleByCattleId(cattleId);
    }

    @GetMapping("search")
    public List<Cattle> searchCattle(@RequestParam("query") String query) {
        return cattleService.searchCattle(query);
    }

    @PutMapping("{cattleId}")
    public void updateCattle(@RequestBody CattleRequest cattleRequest,
                             @PathVariable("cattleId") Long cattleId) {
        cattleService.updateCattle(cattleRequest,cattleId);
    }

    @PostMapping("/filter")
    public List<Cattle> filterValueChainsService(@RequestBody List<Filter> filters) {
        System.out.println("Received filters,,,,,,,,,,,,,: " + filters);
        return cattleService.filterCattle(filters);
    }

    @GetMapping("/metadata")
    public Map<String, Object> getMetadata() {
        return cattleService.getMetadata();
    }


}
