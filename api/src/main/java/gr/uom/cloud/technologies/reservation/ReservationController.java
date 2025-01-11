package gr.uom.cloud.technologies.reservation;

import gr.uom.cloud.technologies.reservation.dto.GetReservationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReservationController {
    private final ReservationService reservationService;

    @GetMapping
        public List<GetReservationDTO> getReservations (@RequestParam(required = false) int carId) {
        return reservationService.getCarReservations(carId);
    }
}
