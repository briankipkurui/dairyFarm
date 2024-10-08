package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "ExpenseTypes")
@Table(name = "expense_types")
public class ExpenseTypes {
    @SequenceGenerator(
            name = "expense_types_sequence",
            sequenceName = "expense_types_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "expense_types_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    private String name;
    private String description;

    public ExpenseTypes
            (
                    String name,
                    String description
            ) {
        this.name = name;
        this.description = description;
    }
}
