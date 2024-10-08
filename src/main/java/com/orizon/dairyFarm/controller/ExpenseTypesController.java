package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.ExpenseTypesRequest;
import com.orizon.dairyFarm.service.ExpenseTypesService;
import com.orizon.dairyFarm.tables.ExpenseTypes;
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

    @GetMapping("search")
    public List<ExpenseTypes> searchExpenseTypes(@RequestParam("query") String query) {
        return expenseTypesService.searchExpenseTypes(query);
    }
}
