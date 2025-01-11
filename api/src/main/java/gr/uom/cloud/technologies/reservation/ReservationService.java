package gr.uom.cloud.technologies.reservation;

import gr.uom.cloud.technologies.reservation.dto.GetReservationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    public final ReservationRepository reservationRepository;

    public List<GetReservationDTO> getCarReservations (int carId) {
        List<Reservation> reservations = reservationRepository.filterReservations(carId);
        return reservations.stream()
                .map(reservation -> new GetReservationDTO(
                        reservation.getId(),
                        reservation.getCitizen().getAfm(),
                        reservation.getCar().getId(),
                        reservation.getReservationDate(),
                        reservation.getReservationTimeInMinutes()
                ))
                .toList();
    }
}
