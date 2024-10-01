package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.BreedsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.repo.LivestockTypeRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Breeds;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.LivestockTypes;
import com.orizon.dairyFarm.utilis.Utilities;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class CattleService {
    private final CattleRepo cattleRepo;
    private final BreedsRepo breedsRepo;
    private final LivestockTypeRepo livestockTypeRepo;

    public void addCattle(CattleRequest cattleRequest) {
        Breeds breeds
                = breedsRepo.findById(cattleRequest.getBreedId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("breed with id " +
                        cattleRequest.getBreedId() + " was not found"));

        LivestockTypes livestock
                = livestockTypeRepo.findById(cattleRequest.getLivestockId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock with id " +
                        cattleRequest.getLivestockId() + " was not found"));

        String splitLivestock = Utilities.splitNameIntoSubstring(livestock.getName());
        Long maxId = cattleRepo.maxID();
        if (maxId == null) {
            maxId = 0L;
        }
        maxId += 1;
        int lastTwoDigitsOfYear = Utilities.getLastTwoDigitsOfYear();

        String serialNumber = Utilities.concatenateSerialNumber(splitLivestock, maxId.toString(), String.valueOf(lastTwoDigitsOfYear));
        LocalDateTime dateOfBirth = Utilities.convertStringToLocalDateTime(cattleRequest.getDateOfBirth());
        LocalDateTime dateDewormed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateDewormed());
        LocalDateTime dateServed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateServed());

        Cattle cattle = new Cattle(
                cattleRequest.getName().toUpperCase(),
                cattleRequest.getSex(),
                serialNumber,
                dateOfBirth,
                dateDewormed,
                dateServed,
                breeds,
                livestock
        );
        cattleRepo.save(cattle);
    }

    public List<Cattle> cattleService() {
        PageRequest pageRequest = PageRequest.of(0, 50, Sort.by("name").ascending());
        Page<Cattle> all = cattleRepo.findAll(pageRequest);
        return all.getContent();
    }

    public List<Cattle> searchCattle(String query) {
        String newQuery = query.toUpperCase();
        return cattleRepo.searchProduct(newQuery);
    }

    public Long getMaxId() {
        return cattleRepo.maxID();
    }

    public List<Cattle> findCattleByCattleId(Long cattleId) {

        return cattleRepo.findCattleByCattleId(cattleId);
    }

    public void updateCattle(CattleRequest cattleRequest, Long cattleId) {
        System.out.println("this is the cattle id ..............**************-----------" + cattleId);
        Breeds breeds
                = breedsRepo.findById(cattleRequest.getBreedId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("breed with id " +
                        cattleRequest.getBreedId() + " was not found"));

        LivestockTypes livestock
                = livestockTypeRepo.findById(cattleRequest.getLivestockId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("livestock with id " +
                        cattleRequest.getLivestockId() + " was not found"));

        Cattle cattle
                = cattleRepo.findById(cattleId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        cattleId + " was not found"));

        Long id = cattle.getId();
        int lastTwoDigitsOfYear = Utilities.getLastTwoDigitsOfYear();
        String splitLivestock = Utilities.splitNameIntoSubstring(livestock.getName());
        String serialNumber = Utilities.concatenateSerialNumber(splitLivestock, String.valueOf(id), String.valueOf(lastTwoDigitsOfYear));
        LocalDateTime dateOfBirth = Utilities.convertStringToLocalDateTime(cattleRequest.getDateOfBirth());
        LocalDateTime dateDewormed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateDewormed());
        LocalDateTime dateServed = Utilities.convertStringToLocalDateTime(cattleRequest.getDateServed());

        cattle.setName(cattleRequest.getName());
        cattle.setSex(cattleRequest.getSex());
        cattle.setSerialNumber(serialNumber);
        cattle.setDateOfBirth(dateOfBirth);
        cattle.setBreeds(breeds);
        cattle.setLivestock(livestock);
        cattle.setDateDewormed(dateDewormed);
        cattle.setDateServed(dateServed);
        cattleRepo.save(cattle);

    }
}
