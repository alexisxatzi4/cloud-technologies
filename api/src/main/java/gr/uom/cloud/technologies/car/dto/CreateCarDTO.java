package gr.uom.cloud.technologies.car.dto;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class CreateCarDTO {
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
