package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.CattleRequest;
import com.orizon.dairyFarm.request.FeedsTypeRequest;
import com.orizon.dairyFarm.request.IncomesRequest;
import com.orizon.dairyFarm.service.IncomesService;
import com.orizon.dairyFarm.tables.FeedsTypes;
import com.orizon.dairyFarm.tables.IncomeTypes;
import com.orizon.dairyFarm.tables.Incomes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/incomes")
public class IncomesController {
    private final IncomesService incomesService;


    @PostMapping("{incomeTypeId}/{valueChainsId}")
    public void addIncomes(@RequestBody IncomesRequest incomesRequest,
                           @PathVariable("incomeTypeId") Long incomeTypeId,
                           @PathVariable("valueChainsId") Long valueChainsId) {
        incomesService.addIncomes(incomesRequest, incomeTypeId,valueChainsId);
    }

    @GetMapping()
    public List<Incomes> getAllIncomes() {
        return incomesService.getAllIncomes();
    }



}
