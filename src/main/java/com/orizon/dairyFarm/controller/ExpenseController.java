package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.ExpenseRequest;
import com.orizon.dairyFarm.service.ExpenseService;
import com.orizon.dairyFarm.tables.Expense;
import com.orizon.dairyFarm.tables.Incomes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/expense")
public class ExpenseController {
    private final ExpenseService expenseService;

    @PostMapping("{expenseTypeId}/{valueChainsId}")
    public void addExpense(@RequestBody ExpenseRequest expenseRequest,
                           @PathVariable("expenseTypeId") Long expenseTypeId,
                           @PathVariable("valueChainsId") Long valueChainsId) {
        expenseService.addExpense(expenseRequest, expenseTypeId,valueChainsId);
    }

    @GetMapping()
    public List<Expense> getAllExpense() {
        return expenseService.getAllExpense();
    }
}
