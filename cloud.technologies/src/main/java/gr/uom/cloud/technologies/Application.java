package gr.uom.cloud.technologies;

import gr.uom.cloud.technologies.dealership.Dealership;
import gr.uom.cloud.technologies.repository.DealershipRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;

@SpringBootApplication
public class Application {

	@Autowired
	private DealershipRepository dealershipRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@PostConstruct
	void init() {
		Dealership dealership1 = new Dealership();
		dealership1.setAfm(123456789);
		dealership1.setName("AutoWorld");
		dealership1.setOwner("Alex");
		dealership1.setPassword("password123");

		Dealership dealership2 = new Dealership();
		dealership2.setAfm(987654321);
		dealership2.setName("CarMax");
		dealership2.setOwner("Aris");
		dealership2.setPassword("password456");
		ArrayList<Dealership> dealerships = new ArrayList<>();
		dealerships.add(dealership1);
		dealerships.add(dealership2);

		dealershipRepository.saveAll(dealerships);
	}
}
