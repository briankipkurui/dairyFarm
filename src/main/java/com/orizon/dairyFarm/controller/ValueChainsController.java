package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.RolesRequest;
import com.orizon.dairyFarm.request.ValueChainRequest;
import com.orizon.dairyFarm.service.ValueChainsService;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import com.orizon.dairyFarm.tables.ValueChains;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/valueChains")
public class ValueChainsController {
    private final ValueChainsService valueChainsService;

    @PostMapping()
    public void addValueChain(@RequestBody ValueChainRequest valueChainRequest) {
        valueChainsService.addValueChain(valueChainRequest);
    }

    @GetMapping()
    public List<ValueChains> getValueChains() {
        return valueChainsService.getValueChains();
    }

    @GetMapping("search")
    public List<ValueChains> searchValueChains(@RequestParam("query") String query) {
        return valueChainsService.searchValueChains(query);
    }

}
