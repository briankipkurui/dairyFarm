package com.orizon.dairyFarm.tables;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @EmbeddedId
    private BirthsId birthsId;

    @ManyToOne(
            cascade = {CascadeType.ALL}
    )
    @JsonBackReference
    @MapsId("cattleId")
    @JoinColumn(
            name = "cattle_id"
    )
    private Cattle cattle;
    @ManyToOne(
            cascade = {CascadeType.ALL}
    )
    @JsonBackReference
    @MapsId("calveId")
    @JoinColumn(
            name = "calveId"
    )
    private Cattle calve;
    private  String sex;

    public Births(BirthsId birthsId,
                  Cattle cattle,
                  Cattle calve,
                  String sex) {
        this.birthsId = birthsId;
        this.cattle = cattle;
        this.calve = calve;
        this.sex = sex;
    }
}
