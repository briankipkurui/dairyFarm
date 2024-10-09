package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.repo.PermissionsRepo;
import com.orizon.dairyFarm.request.PermissionsRequest;
import com.orizon.dairyFarm.tables.Incomes;
import com.orizon.dairyFarm.tables.Permissions;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PermissionsService {
    private final PermissionsRepo permissionsRepo;

    public void addPermissions(PermissionsRequest permissionsRequest) {
        Permissions permissions = new Permissions(
                permissionsRequest.getName(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        permissionsRepo.save(permissions);
    }

    public List<Permissions> getPermissions() {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("amount").ascending());
        Page<Permissions> all = permissionsRepo.findAll(pageRequest);
        return all.getContent();
    }
}
