package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.filtrerResponse.Filter;
import com.orizon.dairyFarm.request.ExpenseRequest;
import com.orizon.dairyFarm.service.ExpenseService;
import com.orizon.dairyFarm.tables.Cattle;
import com.orizon.dairyFarm.tables.Expense;
import com.orizon.dairyFarm.tables.Incomes;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @GetMapping("/metadata")
    public Map<String, Object> getMetadata() {
        return expenseService.getMetadata();
    }

    @PostMapping("/filter")
    public List<Expense> filterValueChainsService(@RequestBody List<Filter> filters) {
        return expenseService.filterExpenses(filters);
    }
}
