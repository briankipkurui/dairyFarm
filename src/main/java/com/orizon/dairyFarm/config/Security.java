package com.orizon.dairyFarm.config;
import com.orizon.dairyFarm.jwt.JwtAuthenticationFilter;
import com.orizon.dairyFarm.jwt.JwtTokenVerified;
import com.orizon.dairyFarm.service.ApplicationUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class Security  extends WebSecurityConfigurerAdapter {
    private  final  PasswordConfig passwordConfig;
    @Autowired
    private  final ApplicationUserService applicationUserService;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager());
        jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests()
                .antMatchers( "**/js/**", "**/css/**")
                .permitAll()
                .antMatchers("/api/v1/births/**")
                .permitAll()
                .antMatchers("/api/v1/breeds/**")
                .permitAll()
                .antMatchers("/api/v1/cattle/**")
                .permitAll()
                .antMatchers("/api/v1/livestock/**")
                .permitAll()
                .antMatchers("/api/v1/production/**")
                .permitAll()
                .antMatchers("/api/v1/userRoles/**")
                .permitAll()
                .antMatchers("/api/v1/roles/**")
                .permitAll()
                .antMatchers("/api/v1/user/**")
                .permitAll()
                .antMatchers("/api/v1/feedsTypes/**")
                .permitAll()
                .antMatchers("/api/v1/feedingFormulas/**")
                .permitAll()
                .antMatchers("/api/v1/feedingRecords/**")
                .permitAll()
                .antMatchers("/api/v1/expenseTypes/**")
                .permitAll()
                .antMatchers("/api/v1/incomeTypes/**")
                .permitAll()
                .antMatchers("/api/v1/incomes/**")
                .permitAll()
                .antMatchers("/api/v1/expense/**")
                .permitAll()
                .antMatchers("/api/v1/permissions/**")
                .permitAll()
                .antMatchers("/api/v1/valueChains/**")
                .permitAll()
                .antMatchers("/api/v1/dashBoard/**")
                .permitAll()
                .anyRequest()
                .authenticated();
        http.addFilter(jwtAuthenticationFilter);
        http.addFilterBefore(new JwtTokenVerified(), UsernamePasswordAuthenticationFilter.class);

    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordConfig.bCryptPasswordEncoder());
        provider.setUserDetailsService(applicationUserService);
        return provider;
    }
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
