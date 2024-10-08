package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.IncomeTypesRepo;
import com.orizon.dairyFarm.repo.IncomesRepo;
import com.orizon.dairyFarm.request.IncomesRequest;
import com.orizon.dairyFarm.tables.IncomeTypes;
import com.orizon.dairyFarm.tables.Incomes;
import com.orizon.dairyFarm.tables.LivestockTypes;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class IncomesService {
    private final IncomesRepo incomesRepo;
    private final IncomeTypesRepo IncomeTypesRepo;

    public void addIncomes(IncomesRequest incomesRequest, Long incomeTypeId) {
        IncomeTypes incomeTypes
                = IncomeTypesRepo.findById(incomeTypeId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("incomeTypes  with id " +
                        incomeTypeId + " was not found"));

        Incomes incomes = new Incomes(
                incomeTypes,
                incomesRequest.getAmount(),
                incomesRequest.getDescription(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        incomesRepo.save(incomes);
    }

    public List<Incomes> getAllIncomes() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("amount").ascending());
        Page<Incomes> all = incomesRepo.findAll(pageRequest);
        return all.getContent();
    }
}
