package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "FeedingRecords")
@Table(name = "feeding_records")
public class FeedingRecords {
    @SequenceGenerator(
            name = "feeding_records_sequence",
            sequenceName = "feeding_records_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "feeding_records_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "feeding_formula_id",
            referencedColumnName = "id"
    )
    private FeedingFormulas feedingFormulas;
    @ManyToOne
    @JoinColumn(
            name = "cattle_id",
            referencedColumnName = "id"
    )
    private Cattle cattle;
    private Double feedGivenKg;
    private Double waterGivenLiters;
    private String remarks;
    private LocalDateTime feedingTime;

    public FeedingRecords(
            FeedingFormulas feedingFormulas,
            Cattle cattle,
            Double feedGivenKg,
            Double waterGivenLiters,
            String remarks,
            LocalDateTime feedingTime
    ) {
        this.feedingFormulas = feedingFormulas;
        this.cattle = cattle;
        this.feedGivenKg = feedGivenKg;
        this.waterGivenLiters = waterGivenLiters;
        this.remarks = remarks;
        this.feedingTime = feedingTime;
    }
}
