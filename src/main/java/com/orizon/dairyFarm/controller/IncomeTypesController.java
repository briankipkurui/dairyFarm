package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.IncomeTypesRequest;
import com.orizon.dairyFarm.service.IncomeTypesService;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.IncomeTypes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/incomeTypes")
public class IncomeTypesController {
    private final IncomeTypesService incomeTypesService;

    @PostMapping()
    public void addIncomeType(@RequestBody IncomeTypesRequest incomeTypesRequest) {
        incomeTypesService.addIncomeType(incomeTypesRequest);
    }

    @GetMapping()
    public List<IncomeTypes> getAllIncomeTypes() {
        return incomeTypesService.getAllIncomeTypes();
    }

    @GetMapping("search")
    public List<IncomeTypes> searchIncomeTypes(@RequestParam("query") String query) {
        return incomeTypesService.searchIncomeTypes(query);
    }
}
