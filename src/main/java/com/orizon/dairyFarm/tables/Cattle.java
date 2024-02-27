package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    public Cattle(String name, String sex) {
        this.name = name;
        this.sex = sex;
    }
}
