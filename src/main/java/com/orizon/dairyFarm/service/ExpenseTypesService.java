package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.ExpenseTypesRepo;
import com.orizon.dairyFarm.request.ExpenseTypesRequest;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.FeedsTypes;
import com.orizon.dairyFarm.tables.IncomeTypes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ExpenseTypesService {
  private final ExpenseTypesRepo expenseTypesRepo;

    public void addExpenseTypes(ExpenseTypesRequest expenseTypesRequest) {
         ExpenseTypes expenseTypes = new ExpenseTypes(
                 expenseTypesRequest.getName(),
                 expenseTypesRequest.getDescription()
         );
         expenseTypesRepo.save(expenseTypes);
    }

    public List<ExpenseTypes> getAllExpenseTypes() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<ExpenseTypes> all = expenseTypesRepo.findAll(pageRequest);
        return all.getContent();
    }

    public List<ExpenseTypes> searchExpenseTypes(String query) {
        return expenseTypesRepo.searchIncomesTypes(query);
    }
}
