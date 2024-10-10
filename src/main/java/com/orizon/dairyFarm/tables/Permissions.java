package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Permissions")
@Table(name = "permissions")
public class Permissions {
    @SequenceGenerator(
            name = "permissions_sequence",
            sequenceName = "permissions_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "permissions_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Permissions(
            String name,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
