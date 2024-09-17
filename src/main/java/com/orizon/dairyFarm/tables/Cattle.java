package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private Long id;
    private String name;
    private String sex;
    private String serialNumber;
    private LocalDateTime dateOfBirth;
    private LocalDateTime DateDewormed;
    private LocalDateTime DateServed;
    @OneToOne
    private Breeds breeds;
    @OneToOne
    private Livestock livestock;

    public Cattle(String name,
                  String sex,
                  String serialNumber,
                  LocalDateTime dateOfBirth,
                  LocalDateTime dateDewormed,
                  LocalDateTime dateServed,
                  Breeds breeds,
                  Livestock livestock) {
        this.name = name;
        this.sex = sex;
        this.serialNumber = serialNumber;
        this.dateOfBirth = dateOfBirth;
        DateDewormed = dateDewormed;
        DateServed = dateServed;
        this.breeds = breeds;
        this.livestock = livestock;
    }
}
