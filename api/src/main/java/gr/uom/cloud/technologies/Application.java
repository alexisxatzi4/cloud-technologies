package gr.uom.cloud.technologies;

import gr.uom.cloud.technologies.car.Car;
import gr.uom.cloud.technologies.car.CarRepository;
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
	private final CarRepository carRepository;

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

		Car car1 = new Car();
		car1.setMake("Toyota");
		car1.setModel("Yaris");
		car1.setFuel("Diesel");
		car1.setEngine(1400);
		car1.setSeats(5);
		car1.setPrice(15.500);
		car1.setDescription("Best vehicle");
		car1.setTotal(19);
		car1.setDealership(dealership1);

		Car car2 = new Car();
		car2.setMake("Opel");
		car2.setModel("Corsa");
		car2.setFuel("Gas");
		car2.setEngine(1300);
		car2.setSeats(5);
		car2.setPrice(12.800);
		car2.setDescription("Good choice");
		car2.setTotal(56);
		car2.setDealership(dealership1);

		Car car3 = new Car();
		car3.setMake("BMW");
		car3.setModel("M3");
		car3.setFuel("Gas");
		car3.setEngine(2000);
		car3.setSeats(5);
		car3.setPrice(29.800);
		car3.setDescription("Speed car");
		car3.setTotal(2);
		car3.setDealership(dealership1);

		carRepository.saveAll(List.of(car1, car2, car3));
	}
}
