package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.exception.StudentNotFoundException;
import com.orizon.dairyFarm.repo.LivestockTypeRepo;
import com.orizon.dairyFarm.request.LivestockRequest;
import com.orizon.dairyFarm.tables.LivestockTypes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LivestockTypeService {
    private final LivestockTypeRepo livestockTypeRepo;
    public void addToLiveStock(LivestockRequest livestockRequest) {
        LivestockTypes livestock = new LivestockTypes(
                livestockRequest.getName(),
                livestockRequest.getDescription()
        );
        livestockTypeRepo.save(livestock);
    }

    public List<LivestockTypes> getLiveStock() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<LivestockTypes> all = livestockTypeRepo.findAll(pageRequest);
        return all.getContent();

    }

    public void updateLiveStock(LivestockRequest livestockRequest,Long livestockIdId) {
        LivestockTypes livestock
                = livestockTypeRepo.findById(livestockIdId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock  with id " +
                        livestockIdId + " was not found"));


        String upperCase = livestockRequest.getName().toUpperCase();
        livestock.setName(upperCase);
        livestockTypeRepo.save(livestock);


    }

    public void deleteLivestock(Long livestockIdId) {
        if (!livestockTypeRepo.existsById(livestockIdId)) {
            throw new StudentNotFoundException(
                    "breed with id " + livestockIdId + " does not exists");
        }
        livestockTypeRepo.deleteById(livestockIdId);
    }

    public List<LivestockTypes> searchLivestock(String query) {
        String newQuery = query.toUpperCase();
        return livestockTypeRepo.searchLivestock(newQuery);
    }

    public List<LivestockTypes> findLiveStockByLiveStockId(Long liveStockId) {
        return livestockTypeRepo.findLiveStockByLiveStockId(liveStockId);
    }
}
