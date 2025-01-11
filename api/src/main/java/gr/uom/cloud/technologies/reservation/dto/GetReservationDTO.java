package gr.uom.cloud.technologies.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GetReservationDTO {
    private Long id;
    private String citizenAfm;
    private Long carId;
    private LocalDateTime reservationDate;
    private int reservationTimeInMinutes;
}
