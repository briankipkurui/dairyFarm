package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.request.BreedsRequest;
import com.orizon.dairyFarm.service.BreedsService;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Cattle;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/breeds")
public class BreedsController {
    private final BreedsService breedsService;

    @PostMapping()
    public void addBreeds(@RequestBody BreedsRequest breedsRequest) {
        breedsService.addBreeds(breedsRequest);
    }

    @GetMapping()
    public List<Breeds> getBreeds() {
        return breedsService.getBreeds();
    }

    @PutMapping("{livestockId}")
    public void updateBreeds(@RequestBody BreedsRequest breedsRequest,
                             @PathVariable("livestockId") Long livestockIdId) {
        breedsService.updateBreeds(breedsRequest,livestockIdId);
    }

    @DeleteMapping(path = "{breedId}")
    public void deleteBreeds(
            @PathVariable("breedId") Long breedId) {
        breedsService.deleteBreeds(breedId);
    }

    @GetMapping("{breedId}")
    public List<Breeds> findBreedByCattleId(@PathVariable("breedId") Long breedId) {
        return breedsService.findBreedByCattleId(breedId);
    }

    @GetMapping("search")
    public List<Breeds> searchBreeds(@RequestParam("query") String query) {
        return breedsService.searchBreeds(query);
    }
    @PostMapping("/filter")
    public List<Breeds> filterValueChainsService(@RequestBody List<Filter> filters) {
        System.out.println("Received filters,,,,,,,,,,,,,: " + filters);
        return breedsService.filterBreeds(filters);
    }
    @GetMapping("/metadata")
    public Map<String, List<String>> getMetadata(){
        return breedsService.getMetadata();
    }
}
