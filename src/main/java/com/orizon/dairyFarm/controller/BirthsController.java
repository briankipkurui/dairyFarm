package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.service.BirthsService;
import com.sun.source.tree.BinaryTree;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/births")
public class BirthsController {
    private final BirthsService birthsService;
    @PostMapping("/{cattleId}/{calveId}")
    public void addBirths(@PathVariable("cattleId") Long cattleId,
                          @PathVariable("calveId") Long calveId){
        birthsService.addBirths(cattleId,calveId);
    }
}
