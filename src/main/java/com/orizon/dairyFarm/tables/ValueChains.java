package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "ValueChains")
@Table(name = "value_chains")
public class ValueChains {
    @SequenceGenerator(
            name = "value_chains_sequence",
            sequenceName = "value_chains_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "value_chains_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.LAZY,
            orphanRemoval = true,
            mappedBy = "valueChains"
    )
    private List<Expense> expenses = new ArrayList<>();

    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.LAZY,
            orphanRemoval = true,
            mappedBy = "valueChains"
    )
    private List<Incomes> incomes = new ArrayList<>();

    public ValueChains(
            String name,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
