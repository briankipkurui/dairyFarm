package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Production")
@Table(name = "production")
public class Production {
    @SequenceGenerator(
            name = "production_sequence",
            sequenceName = "production_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY,
            generator = "production_sequence"
    )
    private Long productionId;
    private Double unit;
    private LocalDateTime time;

    public Production(Double unit,
                      LocalDateTime time) {
        this.unit = unit;
        this.time = time;
    }
}
