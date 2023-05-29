package ph.cdo.slpbackend.config;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Bean
    public Faker faker(){
        return new Faker();
    }

    @Bean
    public Random random(){
        return new Random();
    }
}
