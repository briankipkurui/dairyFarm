package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.IncomeTypesRepo;
import com.orizon.dairyFarm.request.IncomeTypesRequest;
import com.orizon.dairyFarm.tables.ExpenseTypes;
import com.orizon.dairyFarm.tables.IncomeTypes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IncomeTypesService {
   private  final IncomeTypesRepo incomeTypesRepo;

    public void addIncomeType(IncomeTypesRequest incomeTypesRequest) {
        IncomeTypes incomeTypes = new IncomeTypes(
                incomeTypesRequest.getName(),
                incomeTypesRequest.getDescription()
        );
        incomeTypesRepo.save(incomeTypes);
    }

    public List<IncomeTypes> getAllIncomeTypes() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<IncomeTypes> all = incomeTypesRepo.findAll(pageRequest);
        return all.getContent();
    }

    public List<IncomeTypes> searchIncomeTypes(String query) {
        return incomeTypesRepo.searchIncomesTypes(query);
    }

}
