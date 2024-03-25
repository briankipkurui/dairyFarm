package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.AddBirthsRequest;
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
    @PostMapping("")
    public void addBirths(@RequestBody AddBirthsRequest addBirthsRequest){
        birthsService.addBirths(addBirthsRequest);
    }

}
