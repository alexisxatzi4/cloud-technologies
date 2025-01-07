package gr.uom.cloud.technologies.user.dto;

import lombok.Data;

@Data
public class RegisterCitizenDto {
    private String afm;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
