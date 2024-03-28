package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.BirthsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.AddBirthsRequest;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Births;
import com.orizon.dairyFarm.tables.BirthsId;
import com.orizon.dairyFarm.tables.Cattle;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class BirthsService {
    private final CattleRepo cattleRepo;
    private final BirthsRepo birthsRepo;

    public void addBirths(AddBirthsRequest addBirthsRequest) {
        Cattle cattle
                = cattleRepo.findById(addBirthsRequest.getCattleId())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        addBirthsRequest.getCattleId() + " was not found"));

        Cattle calve
                = cattleRepo.findById(addBirthsRequest.getName())
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        addBirthsRequest.getName() + " was not found"));


        if (addBirthsRequest.getName().equals(addBirthsRequest.getCattleId())) {
            throw new IllegalStateException("a cow cannot give birth to itself");
        }

        if(!(addBirthsRequest.getName() >= addBirthsRequest.getCattleId())){
            throw  new IllegalStateException("a calve cannot give birth to a  cow");
        }

        Births byCalve = birthsRepo.findByCalve(calve);
        if(byCalve !=null){
            throw new IllegalStateException("a calve cannot have more than one mother");
        }

        Births births = new Births(
                new BirthsId(addBirthsRequest.getCattleId(),addBirthsRequest.getName()),
                cattle,
                calve

        );
        birthsRepo.save(births);

    }

    public List<Object[]> getDescendants(Long cattleId) {
        return birthsRepo.findDescendantsOfCattle(cattleId);
    }
}
