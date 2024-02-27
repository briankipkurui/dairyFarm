package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Births")
@Table(name = "Births")
public class Births {
    @SequenceGenerator(
            name = "births_sequence",
            sequenceName = "births_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "births_sequence"
    )
    private Long birthId;
    @ManyToOne
    private Cattle cattle;

    @ManyToOne
    private Cattle calve;

    public Births(Cattle cattle, Cattle calve) {
        this.cattle = cattle;
        this.calve = calve;
    }
}
