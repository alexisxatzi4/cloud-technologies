package gr.uom.cloud.technologies.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter @Getter
public class CreateReservationDTO {
    private String citizenAfm;
    private Long carId;
    private LocalDateTime reservationDate;
    private int reservationTimeInMinutes;
}
