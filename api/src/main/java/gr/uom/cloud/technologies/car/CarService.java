package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.car.dto.GetCarDTO;
import gr.uom.cloud.technologies.dealership.Dealership;
import gr.uom.cloud.technologies.car.dto.CreateCarDTO;
import gr.uom.cloud.technologies.dealership.DealershipRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarService {

    private final DealershipRepository dealershipRepository;
    private final CarRepository carRepository;

    @Transactional
    public void createCar(CreateCarDTO createCarDTO) {
        Car car = fillCar(createCarDTO);
        carRepository.save(car);
    }

    public Car fillCar(CreateCarDTO createCarDTO) {
        Car car = new Car();
        car.setMake(createCarDTO.getMake());
        car.setModel(createCarDTO.getModel());
        car.setFuel(createCarDTO.getFuel());
        car.setEngine(createCarDTO.getEngine());
        car.setSeats(createCarDTO.getSeats());
        car.setPrice(createCarDTO.getPrice());
        car.setDescription(createCarDTO.getDescription());
        car.setTotal(createCarDTO.getTotal());
        car.setCreatedAt(LocalDateTime.now());

        Dealership dealership = dealershipRepository.findByAfm(createCarDTO.getDealershipAfm());

        if (dealership == null) {
            throw new RuntimeException("Dealership with AFM " + createCarDTO.getDealershipAfm() + " not found");
        }

        car.setDealership(dealership);

        return car;
    }

    public List<GetCarDTO> getFilteredCars(String make, String model, String fuel, Integer engine,
                                           Integer seats, Double price, String dealershipAfm) {

        make = sanitizeField(make);
        model = sanitizeField(model);
        fuel = sanitizeField(fuel);

        List<Car> cars = carRepository.filterCars(make, model, fuel, engine, seats, price, dealershipAfm);

        return cars.stream()
                .map(car -> new GetCarDTO(
                        car.getId(),
                        car.getMake(),
                        car.getModel(),
                        car.getFuel(),
                        car.getEngine(),
                        car.getSeats(),
                        car.getPrice(),
                        car.getDescription(),
                        car.getTotal(),
                        car.getDealership().getName()
                ))
                .toList();
    }

    private String sanitizeField(String field) {
        return (field == null || field.isBlank()) ? null : field.trim();
    }
}