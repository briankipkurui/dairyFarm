package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.exception.StudentNotFoundException;
import com.orizon.dairyFarm.repo.LivestockRepo;
import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Livestock;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LivestockService {
    private final LivestockRepo livestockRepo;
    public void addToLiveStock(LivestockRequest livestockRequest) {
        Livestock livestock = new Livestock(
                livestockRequest.getName()
        );
        livestockRepo.save(livestock);
    }

    public List<Livestock> getLiveStock() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<Livestock> all = livestockRepo.findAll(pageRequest);
        return all.getContent();

    }

    public void updateLiveStock(LivestockRequest livestockRequest) {
        Livestock livestock
                = livestockRepo.findById(livestockRequest.getLivestockId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock  with id " +
                        livestockRequest.getLivestockId() + " was not found"));


        String upperCase = livestockRequest.getName().toUpperCase();
        livestock.setName(upperCase);
        livestockRepo.save(livestock);


    }

    public void deleteLivestock(Long livestockIdId) {
        if (!livestockRepo.existsById(livestockIdId)) {
            throw new StudentNotFoundException(
                    "breed with id " + livestockIdId + " does not exists");
        }
        livestockRepo.deleteById(livestockIdId);
    }

    public List<Livestock> searchLivestock(String query) {
        String newQuery = query.toUpperCase();
        return livestockRepo.searchLivestock(newQuery);
    }
}
