package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.service.CattleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/cattle")
public class CattleController {
    private  final CattleService cattleService;

    @PostMapping()
    public void addCattle(@RequestBody CattleRequest cattleRequest) {
        cattleService.addCattle(cattleRequest);
    }
}
