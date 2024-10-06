package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "FeedingFormulas")
@Table(name = "feeding_formulas",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"livestock_type_id", "feed_type_id"})
        }
)
@ToString
public class FeedingFormulas {

    @SequenceGenerator(
            name = "feeding_formulas_sequence",
            sequenceName = "feeding_formulas_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "feeding_formulas_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    @OneToOne
    @JoinColumn(
            name = "livestock_type_id",
            referencedColumnName = "id"
    )
    private LivestockTypes livestockTypes;
    @OneToOne
    @JoinColumn(
            name = "feed_type_id",
            referencedColumnName = "id"
    )
    private FeedsTypes feedsTypes;
    private Double quantityKg;
    private String feedingFrequency;
    private String feedingTime;
    private Double waterLiters;
    private String supplements;
    private LocalDateTime createdAt;

    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL, fetch = FetchType.EAGER,
            orphanRemoval = true,
            mappedBy = "feedingFormulas"
    )
    private List<FeedingRecords> feedingFormulas = new ArrayList<>();

    public FeedingFormulas(
            LivestockTypes livestockTypes,
            FeedsTypes feedsTypes,
            Double quantityKg,
            String feedingFrequency,
            String feedingTime,
            Double waterLiters,
            String supplements,
            LocalDateTime createdAt
    ) {
        this.livestockTypes = livestockTypes;
        this.feedsTypes = feedsTypes;
        this.quantityKg = quantityKg;
        this.feedingFrequency = feedingFrequency;
        this.feedingTime = feedingTime;
        this.waterLiters = waterLiters;
        this.supplements = supplements;
        this.createdAt = createdAt;
    }
}