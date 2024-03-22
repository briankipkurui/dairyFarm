package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.ProductionRequest;
import com.orizon.dairyFarm.service.ProductionService;
import com.orizon.dairyFarm.tables.Production;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/production")
public class productionController {
    private final ProductionService productionService;
    @PostMapping()
    public  void addToProduction(@RequestBody ProductionRequest productionRequest){
        productionService.addToProduction(productionRequest);
    }
    @GetMapping()
    public List<Production> getProduction(){
        return productionService.getProduction();
    }
}
