package com.orizon.dairyFarm.repo;

import com.orizon.dairyFarm.tables.ValueChains;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ValueChainRepo extends CrudRepository<ValueChains,Long>, JpaSpecificationExecutor<ValueChains> {
    @Query("SELECT VC FROM ValueChains VC WHERE LOWER(VC.name) LIKE LOWER(CONCAT('%',:query,'%'))")
    List<ValueChains> searchValueChains(String query);
}
