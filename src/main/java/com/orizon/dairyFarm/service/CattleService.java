package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Cattle;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CattleService {
    private  final CattleRepo cattleRepo;
    public void addCattle(CattleRequest cattleRequest) {
        Cattle cattle = new Cattle(
                cattleRequest.getName(),
                cattleRequest.getSex()
        );
        cattleRepo.save(cattle);
    }

    public List<Cattle> cattleService() {
        return cattleRepo.findAll();
    }
}
