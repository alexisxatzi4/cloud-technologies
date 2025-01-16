package gr.uom.cloud.technologies.reservation;

import gr.uom.cloud.technologies.reservation.dto.GetReservationDTO;
import gr.uom.cloud.technologies.reservation.dto.ReservationCitizenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    public final ReservationRepository reservationRepository;

    public List<ReservationCitizenDto> getCarReservationsByCitizenAfm(String citizenAfm) {
        List<Reservation> reservations = reservationRepository.getReservationsByCitizenAfm(citizenAfm);

        return reservations.stream()
                .map(reservation -> new ReservationCitizenDto(
                        reservation.getCar().getDealership().getName(),
                        reservation.getCar().getMake(),
                        reservation.getCar().getModel(),
                        reservation.getCar().getFuel(),
                        reservation.getReservationDate(),
                        reservation.getReservationTimeInMinutes()
                ))
                .toList();

    }
}
