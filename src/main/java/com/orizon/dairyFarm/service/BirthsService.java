package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.BirthsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Births;
import com.orizon.dairyFarm.tables.BirthsId;
import com.orizon.dairyFarm.tables.Cattle;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BirthsService {
    private final CattleRepo cattleRepo;
    private final BirthsRepo birthsRepo;

    public void addBirths(Long cattleId, Long calveId,CattleRequest cattleRequest) {
        Cattle cattle
                = cattleRepo.findById(cattleId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        cattleId + " was not found"));

        Cattle calve
                = cattleRepo.findById(calveId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        calveId + " was not found"));




        if (calveId.equals(cattleId)) {
            throw new IllegalStateException("a cow cannot give birth to itself");
        }

        if(!(calveId >= cattleId)){
            throw  new IllegalStateException("a calve cannot give birth to a  cow");
        }

        Births byCalve = birthsRepo.findByCalve(calve);
        if(byCalve !=null){
            throw new IllegalStateException("a calve cannot have more than one mother");
        }

        Births births = new Births(
                new BirthsId(cattleId,calveId),
                cattle,
                calve,
                cattleRequest.getSex()

        );
        birthsRepo.save(births);

    }

}
