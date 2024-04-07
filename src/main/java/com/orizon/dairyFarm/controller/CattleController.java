package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.repo.BirthsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.service.CattleService;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.CowNode;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/cattle")
public class CattleController {
    private final CattleService cattleService;

    @PostMapping()
    public void addCattle(@RequestBody CattleRequest cattleRequest) {
        cattleService.addCattle(cattleRequest);
    }

    @GetMapping()
    public List<Cattle> cattleService() {
        return cattleService.cattleService();
    }


    @GetMapping("search")
    public List<Cattle> searchCattle(@RequestParam("query") String query) {
        return cattleService.searchCattle(query);
    }

}
