package gr.uom.cloud.technologies.reservation;

import gr.uom.cloud.technologies.car.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.citizen.afm = :afm")
    List<Reservation> getReservationsByCitizenAfm(String afm);


    List<Reservation> findByCarAndReservationDateBetween(Car car, LocalDateTime startDate, LocalDateTime endDate);

}
