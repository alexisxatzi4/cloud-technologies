package gr.uom.cloud.technologies;

import gr.uom.cloud.technologies.dealership.Dealership;
import gr.uom.cloud.technologies.dealership.DealershipRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class Application {

	private final DealershipRepository dealershipRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@PostConstruct
	void init() {
		Dealership dealership1 = new Dealership();
		dealership1.setAfm("123456789");
		dealership1.setEmail("alex@gmail.com");
		dealership1.setName("AutoWorld");
		dealership1.setOwner("Alex");
		dealership1.setPassword("password123");

		Dealership dealership2 = new Dealership();
		dealership2.setAfm("987654321");
		dealership2.setEmail("aris@gmail.com");
		dealership2.setName("CarMax");
		dealership2.setOwner("Aris");
		dealership2.setPassword("password456");

		dealershipRepository.saveAll(List.of(dealership1, dealership2));
	}
}
