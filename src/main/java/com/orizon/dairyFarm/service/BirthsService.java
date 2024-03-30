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

import java.math.BigInteger;
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

        if (!(addBirthsRequest.getName() >= addBirthsRequest.getCattleId())) {
            throw new IllegalStateException("a calve cannot give birth to a  cow");
        }

        Births byCalve = birthsRepo.findByCalve(calve);
        if (byCalve != null) {
            throw new IllegalStateException("a calve cannot have more than one mother");
        }

        Births births = new Births(
                new BirthsId(addBirthsRequest.getCattleId(), addBirthsRequest.getName()),
                cattle,
                calve

        );
        birthsRepo.save(births);

    }

    public List<Object[]> getDescendants(Long Id) {

        List<Object[]> descendantsOfCattle = birthsRepo.findDescendantsOfCattle(Id);

        if (descendantsOfCattle.isEmpty()) {
            List<Object[]> ancestorsOfCattle = birthsRepo.findAncestorsOfCattle(Id);
            if (!ancestorsOfCattle.isEmpty()) {
                Object[] lastArray = ancestorsOfCattle.get(ancestorsOfCattle.size() - 1);
                if (lastArray.length > 0) {
                    BigInteger bigIntegerValue = (BigInteger) lastArray[1];
                    long longValue = bigIntegerValue.longValue();
                    System.out.println("Last array inside the array at index 0: " + longValue);
                    descendantsOfCattle = birthsRepo.findDescendantsOfCattle(longValue);
                } else {
                    System.out.println("The last array is empty");
                }
            } else {
                System.out.println("The list is empty");
            }

        } else {
            System.out.println("it is  not empty");
            if (!descendantsOfCattle.isEmpty()) {
                Object[] lastArray = descendantsOfCattle.get(descendantsOfCattle.size() - 1);
                if (lastArray.length > 0) {
                    BigInteger bigIntegerValue = (BigInteger) lastArray[0];
                    long longValue = bigIntegerValue.longValue();
                    System.out.println("Last array inside the array at index 0: " + longValue);
                    List<Object[]> ancestorsOfCattle = birthsRepo.findAncestorsOfCattle(longValue);
                    Object[] lastArrayOfAncestor = ancestorsOfCattle.get(ancestorsOfCattle.size() - 1);
                    BigInteger bigIntegerValueOfAncestor = (BigInteger) lastArrayOfAncestor[1];
                    long longValueOfAncestor = bigIntegerValueOfAncestor.longValue();
                    descendantsOfCattle = birthsRepo.findDescendantsOfCattle(longValueOfAncestor);
                } else {
                    System.out.println("The last array is empty");
                }
            } else {
                System.out.println("The list is empty");
            }
        }

        return descendantsOfCattle;
    }

    public List<Object[]> getCowAncestors(Long cattleId) {
        return birthsRepo.findAncestorsOfCattle(cattleId);
    }
}
