package gr.uom.cloud.technologies.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationCitizenDto {
    private String dealershipName;
    private String make;
    private String fuel;
    private String model;
    private LocalDateTime reservationDate;
    private int reservationTimeInMinutes;
}
