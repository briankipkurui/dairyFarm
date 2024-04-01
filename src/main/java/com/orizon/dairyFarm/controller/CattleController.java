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
    private final BirthsRepo birthsRepo;
    private  final CattleRepo cattleRepo;

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
    @GetMapping("cows")
    public ResponseEntity<Map<String, Object>> getCowData() {
        List<int[]> relationships = birthsRepo.findDescendantsOfCattle(1);
        CowNode root = generateTree(relationships);
        Map<String, Object> json = root.toJson();
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    private CowNode generateTree(List<int[]> relationships) {
        Map<String, CowNode> cowMap = new HashMap<>();

        for (int[] relation : relationships) {
            int parentId = relation[1];
            int childId = relation[0];
            Cattle cattleByParentId
                    = cattleRepo.findById((long) parentId)
                    .stream()
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("cattle with id " +
                            (long) parentId+ " was not found"));

            Cattle cattleByChildId
                    = cattleRepo.findById((long) childId)
                    .stream()
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("cattle with id " +
                            (long) childId+ " was not found"));

            String parentIdToUse = cattleByParentId.getName();
            String childIdToUse = cattleByChildId.getName();


            CowNode parent = cowMap.getOrDefault(parentIdToUse, new CowNode(parentIdToUse));
            CowNode child = cowMap.getOrDefault(childIdToUse, new CowNode(childIdToUse));

            parent.addChild(child);

            cowMap.put(parentIdToUse, parent);
            cowMap.put(childIdToUse, child);
        }



        return cowMap.get("MREMBO");
    }
}
