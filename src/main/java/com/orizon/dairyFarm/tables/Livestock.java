package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Livestock")
@Table(name = "livestock")
public class Livestock {
    @SequenceGenerator(
            name = "livestock_sequence",
            sequenceName = "livestock_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "livestock_sequence"
    )
    private Long livestockId;
    private String name;


    public Livestock(String name) {
        this.name = name;
    }
}
