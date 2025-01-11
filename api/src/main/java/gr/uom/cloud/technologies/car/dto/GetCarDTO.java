package gr.uom.cloud.technologies.car.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetCarDTO {
    private Long id;
    private String make;
    private String model;
    private String fuel;
    private Integer engine;
    private Integer seats;
    private Double price;
    private String description;
    private Integer total;
    private String dealershipAfm;
}
