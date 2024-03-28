package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.CattleRepo;
import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Cattle;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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
        PageRequest pageRequest = PageRequest.of(0, 50, Sort.by("name").ascending());
        Page<Cattle> all = cattleRepo.findAll(pageRequest);
        return all.getContent();
    }

    public List<Cattle> searchCattle(String query) {
        String newQuery = query.toUpperCase();
        return cattleRepo.searchProduct(newQuery);
    }

}
