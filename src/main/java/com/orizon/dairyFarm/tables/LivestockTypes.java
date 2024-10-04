package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "LivestockTypes")
@Table(name = "livestock_types")
public class LivestockTypes {
    @SequenceGenerator(
            name = "livestock_type_sequence",
            sequenceName = "livestock_type_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "livestock_type_sequence"
    )
    private Long id;
    private String name;
    private String description;
    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.EAGER,
            orphanRemoval = true,
            mappedBy = "livestockTypes"
    )
    private List<FeedingFormulas> feedingFormulas = new ArrayList<>();


    public LivestockTypes(String name,
                          String description) {
        this.name = name;
        this.description = description;
    }
}
