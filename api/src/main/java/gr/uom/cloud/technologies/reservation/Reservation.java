package gr.uom.cloud.technologies.reservation;

import gr.uom.cloud.technologies.car.Car;
import gr.uom.cloud.technologies.citizen.Citizen;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Citizen citizen;

    @ManyToOne(fetch = FetchType.LAZY)
    private Car car;

    private LocalDateTime reservationDate;

    private int reservationTimeInMinutes;

}
