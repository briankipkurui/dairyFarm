package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.AddBirthsRequest;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.service.BirthsService;
import com.sun.source.tree.BinaryTree;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/births")
public class BirthsController {
    private final BirthsService birthsService;
    @PostMapping()
    public void addBirths(@RequestBody AddBirthsRequest addBirthsRequest){
        birthsService.addBirths(addBirthsRequest);
    }

    @GetMapping("descendants/{id}")
    public List<Object[]> cattleService(@PathVariable("id")Long Id) {
        return birthsService.getDescendants(Id);
    }

    @GetMapping("ancestors/{calveId}")
    public List<Object[]> getCowAncestors(@PathVariable("calveId")Long calveId) {
        return birthsService.getCowAncestors(calveId);
    }

}
