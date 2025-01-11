package gr.uom.cloud.technologies.user.dto;

import lombok.Data;

@Data
public class LoginResponseDto {
    private String afm;
    private String name;
    private boolean isCitizen;
}
