package com.orizon.dairyFarm.tables;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BirthsId  implements Serializable {
    @Column(
            name = "cattle_id"
    )
    private Long cattleId;
    @Column(
            name = "calve_id"
    )
    private Long calveId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BirthsId birthsId = (BirthsId) o;
        return Objects.equals(cattleId, birthsId.cattleId) && Objects.equals(calveId, birthsId.calveId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cattleId, calveId);
    }
}
