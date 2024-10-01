package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "FeedsTypes")
@Table(name = "feeds_types")
public class FeedsTypes {
    @SequenceGenerator(
            name = "feeds_types_sequence",
            sequenceName = "feeds_types_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "feeds_types_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    @Column(
            name = "name"
    )
    private String name;
    @Column(
            name = "description"
    )
    private String description;
    @Column(
            name = "protein_pct"
    )
    private String proteinPct;
    @Column(
            name = "fat_pct"
    )
    private String fatPct;
    @Column(
            name = "fiber_pct"
    )
    private String fiberPct;
    @Column(
            name = "energy"
    )
    private String energy;
    @Column(
            name = "cost_per_kg"
    )
    private String costPerKg;
    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.EAGER,
            orphanRemoval = true,
            mappedBy = "feedsTypes"
    )
    private List<FeedingFormulas> feedingFormulas =new ArrayList<>();

    public FeedsTypes(
            String name,
            String description,
            String proteinPct,
            String fatPct,
            String fiberPct,
            String energy,
            String costPerKg
    ) {
        this.name = name;
        this.description = description;
        this.proteinPct = proteinPct;
        this.fatPct = fatPct;
        this.fiberPct = fiberPct;
        this.energy = energy;
        this.costPerKg = costPerKg;
    }
}
