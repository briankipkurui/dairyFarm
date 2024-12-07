package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.request.RolesRequest;
import com.orizon.dairyFarm.request.ValueChainRequest;
import com.orizon.dairyFarm.service.ValueChainsService;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import com.orizon.dairyFarm.tables.ValueChains;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/valueChains")
public class ValueChainsController {
    private final ValueChainsService valueChainsService;
    @Autowired
    private EntityManager entityManager;

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

    @PostMapping("/filter")
    public List<ValueChains> filterValueChainsService(@RequestBody List<Filter> filters) {
        System.out.println("Received filters,,,,,,,,,,,,,: " + filters);
        return valueChainsService.filterValueChainsService(filters);
    }

    @GetMapping("/metadata")
    public Map<String, List<String>> getMetadata() {
        return valueChainsService.getMetadata();
    }

}
