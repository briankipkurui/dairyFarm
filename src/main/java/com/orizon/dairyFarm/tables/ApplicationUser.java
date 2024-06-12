package com.orizon.dairyFarm.tables;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "ApplicationUser")
@Table(name = "application_user")
public class ApplicationUser {
    @SequenceGenerator(
            name = "application_user_sequence",
            sequenceName = "application_user_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "application_user_sequence"
    )
    private Long userId;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    private String identificationNumber;
    private LocalDateTime createdAt;
    private Boolean enabled = false;

    @OneToMany(
//            cascade = {CascadeType.ALL},
            mappedBy = "applicationUser",
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    private Set<ApplicationUserRoles> applicationUserRoles = new HashSet<>();

    public ApplicationUser(String firstName,
                           String lastName,
                           String phoneNumber,
                           String email,
                           String password,
                           String identificationNumber,
                           LocalDateTime createdAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.identificationNumber = identificationNumber;
        this.createdAt = createdAt;
    }
}
