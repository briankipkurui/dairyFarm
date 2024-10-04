package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "FeedingFormulas")
@Table(name = "feeding_formulas")
@ToString
public class FeedingFormulas {


    @EmbeddedId
    private FeedingFormulasIds feedingFormulasIds;
    @ManyToOne
    @MapsId("livestockTypeId")
//    @JsonBackReference
    @JoinColumn(
            name = "livestock_type_id",
            referencedColumnName = "id"
    )
    private LivestockTypes livestockTypes;
    @ManyToOne
    @MapsId("feedTypeId")
//    @JsonBackReference
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

    public FeedingFormulas(
            FeedingFormulasIds feedingFormulasIds,
            LivestockTypes livestockTypes,
            FeedsTypes feedsTypes,
            Double quantityKg,
            String feedingFrequency,
            String feedingTime,
            Double waterLiters,
            String supplements,
            LocalDateTime createdAt
    ) {
        this.feedingFormulasIds = feedingFormulasIds;
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
