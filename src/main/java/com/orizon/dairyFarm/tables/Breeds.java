package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Breeds")
@Table(name = "breeds")
public class Breeds {
    @SequenceGenerator(
            name = "breeds_sequence",
            sequenceName = "breeds_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "breeds_sequence"
    )
    private Long id;
    private String name;

    public Breeds(String name) {
        this.name = name;
    }
}
