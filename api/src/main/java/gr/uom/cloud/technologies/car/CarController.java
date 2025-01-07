package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.car.dto.CreateCarDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @PostMapping
    public void createCar(@RequestBody CreateCarDTO createCarDTO) {
        carService.createCar(createCarDTO);
    }
}
