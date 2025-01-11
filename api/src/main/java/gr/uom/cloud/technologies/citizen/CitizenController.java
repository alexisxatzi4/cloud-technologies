package gr.uom.cloud.technologies.citizen;

import gr.uom.cloud.technologies.reservation.dto.CreateReservationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/citizen")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CitizenController {

    private final CitizenService citizenService;

    @PostMapping("/reservation")
    public void createReservation(@RequestBody CreateReservationDTO createReservationDTO) {
        citizenService.createReservation(createReservationDTO);
    }
}
