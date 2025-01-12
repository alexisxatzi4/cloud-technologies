package gr.uom.cloud.technologies.car.dto;

import lombok.Data;

@Data
public class UpdateCarTotalRequestDto {
    private Integer total;
    private String dealershipAfm;
}
