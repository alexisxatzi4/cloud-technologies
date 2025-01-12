package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.car.dto.CreateCarDTO;
import gr.uom.cloud.technologies.car.dto.GetCarDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CarController {

    private final CarService carService;

    @PostMapping
    public ResponseEntity<String> createCar(@RequestBody CreateCarDTO createCarDTO) {
        carService.createCar(createCarDTO);

        return ResponseEntity.ok("Car created successfully");
    }

    @GetMapping
    public ResponseEntity<List<GetCarDTO>> getCars(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String fuel,
            @RequestParam(required = false) Integer engine,
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false) Double price,
            @RequestParam(required = false) String dealershipAfm
    ) {
        List<GetCarDTO> filteredCars = carService.getFilteredCars(make, model, fuel, engine, seats, price, dealershipAfm);

        return ResponseEntity.ok(filteredCars);
    }
}