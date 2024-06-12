package com.orizon.dairyFarm.service;

import com.orizon.dairyFarm.config.PasswordConfig;
import com.orizon.dairyFarm.repo.ApplicationUserRepo;
import com.orizon.dairyFarm.request.RegistrationRequestApplicationUser;
import com.orizon.dairyFarm.tables.ApplicationUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Service
@AllArgsConstructor
public class ApplicationUserService  implements UserDetailsService {
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    private final PasswordConfig passwordConfig;
    private final ApplicationUserRepo applicationUserRepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        ApplicationUser applicationUser = applicationUserRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));


//        if (!applicationUser.getEnabled()) {
//            throw new IllegalStateException("user is not enabled");
//        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        applicationUser.getApplicationUserRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoles().getName()));
        });
        String username = applicationUser.getUserId().toString();
        return new User(
                username,
                applicationUser.getPassword(),
                authorities
        );
    }

    private void singUpUser(ApplicationUser applicationUser) {
        boolean userExist = applicationUserRepo
                .findByEmail(applicationUser.getEmail())
                .isPresent();
        if (userExist) {
            throw new IllegalStateException("email already taken");
        }

        String encodePassword = passwordConfig.bCryptPasswordEncoder()
                .encode(applicationUser.getPassword());

        applicationUser.setPassword(encodePassword);
        applicationUserRepo.save(applicationUser);
    }

    public void registerUser(RegistrationRequestApplicationUser requestApplicationUser) {
        singUpUser(
                new ApplicationUser(
                        requestApplicationUser.getFirstName(),
                        requestApplicationUser.getLastName(),
                        requestApplicationUser.getPhoneNumber(),
                        requestApplicationUser.getEmail(),
                        requestApplicationUser.getPassword(),
                        requestApplicationUser.getIdentificationNumber(),
                        LocalDateTime.now()

                )
        );
    }
}
