package fr.lala_sedar.ImmoPulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ImmoPulseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImmoPulseApplication.class, args);
	}

}
