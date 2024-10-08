package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "Expense")
@Table(name = "expense")
public class Expense {
    @SequenceGenerator(
            name = "expense_sequence",
            sequenceName = "expense_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "expense_sequence"
    )
    @Column(
            name = "id"
    )
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "expense_Type_id"
    )
    private ExpenseTypes expenseType;
    private Double amount;
    private String description;
    private LocalDateTime transactionDate;
    private LocalDateTime updatedAt;

    public Expense(
            ExpenseTypes expenseType,
            Double amount,
            String description,
            LocalDateTime transactionDate,
            LocalDateTime updatedAt
    ) {
        this.expenseType = expenseType;
        this.amount = amount;
        this.description = description;
        this.transactionDate = transactionDate;
        this.updatedAt = updatedAt;
    }
}
