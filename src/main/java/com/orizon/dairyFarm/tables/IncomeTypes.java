package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "IncomeTypes")
@Table(name = "income_types")
public class IncomeTypes {
    @SequenceGenerator(
            name = "income_types_sequence",
            sequenceName = "income_types_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "income_types_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    private String name;
    private String description;

    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.EAGER,
            orphanRemoval = true,
            mappedBy = "incomeTypes"
    )
    private List<Incomes> incomes = new ArrayList<>();

    public IncomeTypes(
            String name,
            String description
    ) {
        this.name = name;
        this.description = description;
    }
}
