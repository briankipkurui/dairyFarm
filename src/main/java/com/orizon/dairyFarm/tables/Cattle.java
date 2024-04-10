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
@Entity(name = "Cattle")
@Table(name = "cattle")
public class Cattle {
    @SequenceGenerator(
            name = "cattle_sequence",
            sequenceName = "cattle_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "cattle_sequence"
    )
    private Long cattleId;
    private  String name;
    private String sex;
    @OneToOne
    private Breeds breeds;
    @OneToOne
    private Livestock livestock;


    public Cattle(String name,
                  String sex,
                  Breeds breeds,
                  Livestock livestock) {
        this.name = name;
        this.sex = sex;
        this.breeds = breeds;
        this.livestock = livestock;
    }
}
