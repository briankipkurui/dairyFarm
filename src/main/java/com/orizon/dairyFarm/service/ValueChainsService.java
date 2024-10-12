package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.ValueChainRepo;
import com.orizon.dairyFarm.request.ValueChainRequest;
import com.orizon.dairyFarm.tables.Incomes;
import com.orizon.dairyFarm.tables.ValueChains;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ValueChainsService {
  private final ValueChainRepo valueChainRepo;
    public void addValueChain(ValueChainRequest valueChainRequest) {
        ValueChains valueChains = new ValueChains(
                valueChainRequest.getName(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        valueChainRepo.save(valueChains);
    }

    public List<ValueChains> getValueChains() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name").ascending());
        Page<ValueChains> all = valueChainRepo.findAll(pageRequest);
        return all.getContent();
    }

    public List<ValueChains> searchValueChains(String query) {
        return valueChainRepo.searchValueChains(query);
    }
}
