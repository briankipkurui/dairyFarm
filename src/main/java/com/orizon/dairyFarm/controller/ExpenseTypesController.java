package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.ExpenseTypesRequest;
import com.orizon.dairyFarm.request.FeedsTypeRequest;
import com.orizon.dairyFarm.service.ExpenseTypesService;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.FeedsTypes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/expenseTypes")
public class ExpenseTypesController {
    private final ExpenseTypesService expenseTypesService;

    @PostMapping()
    public void addExpenseTypes(@RequestBody ExpenseTypesRequest expenseTypesRequest) {
        expenseTypesService.addExpenseTypes(expenseTypesRequest);
    }

    @GetMapping()
    public List<ExpenseTypes> getAllExpenseTypes() {
        return expenseTypesService.getAllExpenseTypes();
    }
}
