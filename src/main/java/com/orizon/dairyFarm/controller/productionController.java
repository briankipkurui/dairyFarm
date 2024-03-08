package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.ProductionRequest;
import com.orizon.dairyFarm.service.ProductionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/production")
public class productionController {
    private final ProductionService productionService;
    @PostMapping()
    public  void addToProduction(@RequestBody ProductionRequest productionRequest){
        productionService.addToProduction(productionRequest);
    }
}
