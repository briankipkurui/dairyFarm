package com.orizon.dairyFarm.tables;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FeedingFormulasIds implements Serializable {

    @Column(
            name = "livestock_type_id"
    )
    private Long livestockTypeId;
    @Column(
            name = "feed_type_id"
    )
    private Long feedTypeId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeedingFormulasIds that = (FeedingFormulasIds) o;
        return Objects.equals(livestockTypeId, that.livestockTypeId) && Objects.equals(feedTypeId, that.feedTypeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(livestockTypeId, feedTypeId);
    }
}
