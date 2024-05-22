package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.AddBirthsRequest;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.service.BirthsService;
import com.orizon.dairyFarm.tables.CowNode;
import com.sun.source.tree.BinaryTree;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/births")
public class BirthsController {
    private final BirthsService birthsService;

    @PostMapping()
    public void addBirths(@RequestBody AddBirthsRequest addBirthsRequest) {
        birthsService.addBirths(addBirthsRequest);
    }

    //  testing route
    @GetMapping("descendants/{id}")
    public List<int[]> cattleService(@PathVariable("id") Long Id) {
        return birthsService.getDescendants(Id);
    }

    @GetMapping("ancestors/{calveId}")
    public List<Object[]> getCowAncestors(@PathVariable("calveId") Long calveId) {
        return birthsService.getCowAncestors(calveId);
    }

    @GetMapping("cowDescendants/{id}")
    public ResponseEntity<Map<String, Object>> getCowDescendants(@PathVariable("id") Long Id) {
        List<int[]> descendants = birthsService.getDescendants(Id);
        if (descendants.isEmpty()) {
            Map<String, Object> emptyJson = new HashMap<>();
            return ResponseEntity.ok(emptyJson);
        }
        int[] firstArrayOfAncestor = descendants.get(0);
        long elementAtIndex1 = firstArrayOfAncestor[1];
        CowNode root = birthsService.generateTree(descendants, elementAtIndex1);
        Map<String, Object> json = root.toJson();
        return ResponseEntity.ok(json);
    }

    @GetMapping("distinctCowDescendants/{id}")
    public ResponseEntity<Map<String, Object>> getDistinctCowDescendants(@PathVariable("id") Long Id) {
        List<int[]> descendants = birthsService.getDistinctCowDescendants(Id);
        if (descendants.isEmpty()) {
            Map<String, Object> emptyJson = new HashMap<>();
            return ResponseEntity.ok(emptyJson);
        }
        int[] firstArrayOfAncestor = descendants.get(0);
        long elementAtIndex1 = firstArrayOfAncestor[1];
        CowNode root = birthsService.generateTree(descendants, elementAtIndex1);
        Map<String, Object> json = root.toJson();
        return ResponseEntity.ok(json);
    }

    @GetMapping("descendantsByCalveId/{id}")
    public List<int[]> descendantsOfCattleByCalveId(@PathVariable("id") Long Id) {
        return birthsService.descendantsOfCattleByCalveId(Id);
    }

    @GetMapping("name/{id}")
    public String getName(@PathVariable("id") Long Id) {
        return birthsService.getName(Id);
    }

    @GetMapping("subString/{id}")
    public String getSerialNumber(@PathVariable("id") Long Id) {
        return birthsService.getSerialNumber(Id);
    }


}
