package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.car.dto.GetCarDTO;
import gr.uom.cloud.technologies.dealership.Dealership;
import gr.uom.cloud.technologies.car.dto.CreateCarDTO;
import gr.uom.cloud.technologies.dealership.DealershipRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

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

        Dealership dealership = dealershipRepository.findByAfm(createCarDTO.getDealershipAfm());

        if (dealership == null) {
            throw new EntityNotFoundException("Dealership with AFM " + createCarDTO.getDealershipAfm() + " not found");
        }

        car.setDealership(dealership);

        return car;
    }

    public List<GetCarDTO> getFilteredCars(String make, String model, String fuel, Integer engine,
                                           Integer seats, Double price, String dealershipAfm) {
        List<Car> cars = carRepository.filterCars(make, model, fuel, engine, seats, price, dealershipAfm);
        return cars.stream().map(car -> {
            GetCarDTO dto = new GetCarDTO();
            dto.setMake(car.getMake());
            dto.setModel(car.getModel());
            dto.setFuel(car.getFuel());
            dto.setEngine(car.getEngine());
            dto.setSeats(car.getSeats());
            dto.setPrice(car.getPrice());
            dto.setDescription(car.getDescription());
            dto.setTotal(car.getTotal());
            dto.setDealershipAfm(car.getDealership().getAfm());
            return dto;
        }).collect(Collectors.toList());

    }
}