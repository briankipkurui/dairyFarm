package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Incomes")
@Table(name = "incomes")
public class Incomes {
    @SequenceGenerator(
            name = "incomes_sequence",
            sequenceName = "incomes_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "incomes_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "income_Type_id"
    )
    private IncomeTypes incomeTypes;
    @ManyToOne
    @JoinColumn(
            name = "value_chain_id"
    )
    private ValueChains valueChains;
    private Double amount;
    private String description;
    private LocalDateTime transactionDate;
    private LocalDateTime updatedAt;

    public Incomes
            (
                    IncomeTypes incomeTypes,
                    ValueChains valueChains,
                    Double amount,
                    String description,
                    LocalDateTime transactionDate,
                    LocalDateTime updatedAt
            ) {
        this.incomeTypes = incomeTypes;
        this.valueChains = valueChains;
        this.amount = amount;
        this.description = description;
        this.transactionDate = transactionDate;
        this.updatedAt = updatedAt;
    }
}
