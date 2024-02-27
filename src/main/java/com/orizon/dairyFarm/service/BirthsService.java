package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.tables.Births;
import org.springframework.stereotype.Service;

@Service
public class BirthsService {
    public void addBirths(Long cattleId, Long calveId) {

        Births births = new Births(
                null,
                null
        );
    }

}
