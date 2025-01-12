package gr.uom.cloud.technologies.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.car.id = :carId")
    List<Reservation> filterReservations(@Param("carId") int carId);

    @Query("SELECT r FROM Reservation r WHERE r.citizen.afm = :afm")
    List<Reservation> getReservationsByCitizenAfm(String afm);
}
