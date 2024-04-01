package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.BirthsRepo;
import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.AddBirthsRequest;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Births;
import com.orizon.dairyFarm.tables.BirthsId;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.CowNode;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<int[]> getDescendants(Long Id) {

        List<int[]> descendantsOfCattle = birthsRepo.findDescendantsOfCattle(Id);

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
            int[] lastArray = descendantsOfCattle.get(descendantsOfCattle.size() - 1);
            if (lastArray.length > 0) {
                int bigIntegerValue = lastArray[0];
                long longValue = bigIntegerValue;
                System.out.println("Last array of a cow  inside the array at index 0: " + longValue);
                List<Object[]> ancestorsOfCattle = birthsRepo.findAncestorsOfCattle(longValue);
                Object[] lastArrayOfAncestor = ancestorsOfCattle.get(ancestorsOfCattle.size() - 1);

                BigInteger bigIntegerValueOfAncestor = (BigInteger) lastArrayOfAncestor[1];
                long longValueOfAncestor = bigIntegerValueOfAncestor.longValue();

                descendantsOfCattle = birthsRepo.findDescendantsOfCattle(longValueOfAncestor);
            } else {
                System.out.println("The last array is empty");
            }
        }
        if (descendantsOfCattle.isEmpty()) {
            throw new IllegalStateException("the provided id as no relationship");
        }

        return descendantsOfCattle;
    }

    public List<Object[]> getCowAncestors(Long cattleId) {
        return birthsRepo.findAncestorsOfCattle(cattleId);
    }

    public CowNode generateTree(List<int[]> relationships,long parentMother) {
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

        Cattle parentMotherID
                = cattleRepo.findById(parentMother)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("cattle with id " +
                        parentMother + " was not found"));

        String name = parentMotherID.getName();

        return cowMap.get(name);
    }
}
