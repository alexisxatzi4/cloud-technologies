package gr.uom.cloud.technologies.citizen;

import gr.uom.cloud.technologies.reservation.Reservation;
import gr.uom.cloud.technologies.reservation.ReservationRepository;
import gr.uom.cloud.technologies.car.Car;
import gr.uom.cloud.technologies.car.CarRepository;
import gr.uom.cloud.technologies.reservation.dto.CreateReservationDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CitizenService {
    private final CitizenRepository citizenRepository;
    private final CarRepository carRepository;
    private final ReservationRepository reservationRepository;

    public Car carExists(Long carId) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("No car found with id " + carId));

        if (car.getTotal() <= 0) {
            throw new RuntimeException("No available car for reservation");
        }

        return car;
    }

    public Reservation fillReservation(CreateReservationDTO createReservationDTO) {
        Long carId = createReservationDTO.getCarId();
        Reservation reservation = new Reservation();
        reservation.setReservationDate(createReservationDTO.getReservationDate());
        reservation.setReservationTimeInMinutes(createReservationDTO.getReservationTimeInMinutes());

        Citizen citizen = citizenRepository.findByAfm(createReservationDTO.getCitizenAfm());

        if (citizen == null){
            throw new RuntimeException("Citizen with AFM " + createReservationDTO.getCitizenAfm() + " not found");
        }

        reservation.setCitizen(citizen);
        Car car = carExists(carId);
        reservation.setCar(car);
        return reservation;
    }

    public void createReservation (CreateReservationDTO createReservationDTO) {
        Reservation reservation = fillReservation(createReservationDTO);
        reservationRepository.save(reservation);
    }
}
