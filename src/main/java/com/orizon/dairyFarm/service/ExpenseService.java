package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.ExpenseRepo;
import com.orizon.dairyFarm.repo.ExpenseTypesRepo;
import com.orizon.dairyFarm.request.ExpenseRequest;
import com.orizon.dairyFarm.tables.Expense;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.Incomes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ExpenseService {
    private final ExpenseTypesRepo expenseTypesRepo;
    private final ExpenseRepo expenseRepo;
    public void addExpense(ExpenseRequest expenseRequest, Long expenseTypeId) {
        ExpenseTypes expenseTypes
                = expenseTypesRepo.findById(expenseTypeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("ExpenseTypes  with id " +
                        expenseTypeId + " was not found"));

        Expense expense = new Expense(
                expenseTypes,
                expenseRequest.getAmount(),
                expenseRequest.getDescription(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        expenseRepo.save(expense);
    }

    public List<Expense> getAllExpense() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("amount").ascending());
        Page<Expense> all = expenseRepo.findAll(pageRequest);
        return all.getContent();
    }
}
