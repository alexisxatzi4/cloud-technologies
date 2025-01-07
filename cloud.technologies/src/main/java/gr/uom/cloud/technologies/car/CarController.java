package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.dto.car.CreateCarDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping
    public void createCar(@RequestBody CreateCarDTO createCarDTO) {
        carService.createCar(createCarDTO);
    }
}
