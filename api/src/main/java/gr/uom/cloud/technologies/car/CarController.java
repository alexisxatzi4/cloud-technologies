package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.car.dto.CreateCarDTO;
import gr.uom.cloud.technologies.car.dto.GetCarDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @PostMapping
    public void createCar(@RequestBody CreateCarDTO createCarDTO) {
        carService.createCar(createCarDTO);
    }

    @GetMapping
    public List<GetCarDTO> getCars(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String fuel,
            @RequestParam(required = false) Integer engine,
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) String dealershipAfm
    ) {
        return carService.getFilteredCars(make, model, fuel, engine, seats, price, dealershipAfm);
    }
}