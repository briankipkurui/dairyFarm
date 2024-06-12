package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity(name = "Roles")
@Table(name = "roles",
        uniqueConstraints = @UniqueConstraint(name = "role_unique",columnNames = "name"))
public class Roles {
    @SequenceGenerator(
            name = "roles_sequence",
            sequenceName = "roles_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "roles_sequence"
    )
    private Long id;
    @Column(
            name = "name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String name;

//    @OneToMany(
//            mappedBy = "role"
//    )
//    private Set<RoleToApplicationUser> rolesAndUsers = new HashSet<>();

    public Roles(String name) {
        this.name = name;
    }
}
