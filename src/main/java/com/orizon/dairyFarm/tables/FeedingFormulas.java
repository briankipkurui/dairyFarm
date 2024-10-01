package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "FeedingFormulas")
@Table(name = "feeding_formulas")
public class FeedingFormulas {


    @EmbeddedId

    private FeedingFormulasIds feedingFormulasIds;
    @ManyToOne
    @JsonBackReference
    @MapsId("livestockTypeId")
    @JoinColumn(
            name = "livestock_type_id"
    )
    private LivestockTypes livestockTypes;
    @ManyToOne
    @JsonBackReference
    @MapsId("feedTypeId")
    @JoinColumn(
            name = "feed_type_id"
    )
    private FeedsTypes feedsTypes;
    private Double quantity_kg;
    private String feeding_frequency;
    private String feeding_time;
    private Double water_liters;
    private String supplements;
    private LocalDateTime created_at;

    public FeedingFormulas
            (
                    FeedingFormulasIds feedingFormulasIds,
                    LivestockTypes livestockTypes,
                    FeedsTypes feedsTypes,
                    Double quantity_kg,
                    String feeding_frequency,
                    String feeding_time,
                    Double water_liters,
                    String supplements,
                    LocalDateTime created_at
            ) {
        this.feedingFormulasIds = feedingFormulasIds;
        this.livestockTypes = livestockTypes;
        this.feedsTypes = feedsTypes;
        this.quantity_kg = quantity_kg;
        this.feeding_frequency = feeding_frequency;
        this.feeding_time = feeding_time;
        this.water_liters = water_liters;
        this.supplements = supplements;
        this.created_at = created_at;
    }
}
