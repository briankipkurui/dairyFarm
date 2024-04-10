package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.exception.StudentNotFoundException;
import com.orizon.dairyFarm.repo.BreedsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.BreedsRequest;
import com.orizon.dairyFarm.tables.Breeds;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BreedsService {
    private final BreedsRepo breedsRepo;

    public void addBreeds(BreedsRequest breedsRequest) {
        boolean userExist = breedsRepo
                .findByName(breedsRequest.getName())
                .isPresent();
        if (userExist) {
            throw new IllegalStateException("name already exist");
        }
        Breeds breeds = new Breeds(
                breedsRequest.getName().toUpperCase()
        );
        breedsRepo.save(breeds);
    }

    public List<Breeds> getBreeds() {
        PageRequest pageRequest = PageRequest.of(0, 1, Sort.by("name").ascending());
        Page<Breeds> all = breedsRepo.findAll(pageRequest);
        return all.getContent();
    }

    public void updateBreeds(BreedsRequest breedsRequest) {
        Breeds breeds
                = breedsRepo.findById(breedsRequest.getBreedId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("breed with id " +
                        breedsRequest.getBreedId() + " was not found"));


        String upperCase = breedsRequest.getName().toUpperCase();
        breeds.setName(upperCase);
        breedsRepo.save(breeds);
    }


    public void deleteBreeds(Long breedId) {
        if (!breedsRepo.existsById(breedId)) {
            throw new StudentNotFoundException(
                    "breed with id " + breedId + " does not exists");
        }
        breedsRepo.deleteById(breedId);
    }

    public List<Breeds> searchBreeds(String query) {
        String newQuery = query.toUpperCase();
        return breedsRepo.searchProduct(newQuery);
    }
}
