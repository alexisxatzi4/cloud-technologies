package gr.uom.cloud.technologies.reservation;

import gr.uom.cloud.technologies.reservation.dto.ReservationCitizenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping("citizens/{citizenAfm}")
    public List<ReservationCitizenDto> getCarReservationsByCitizenAfm(@PathVariable String citizenAfm) {
        return reservationService.getCarReservationsByCitizenAfm(citizenAfm);
    }
}
