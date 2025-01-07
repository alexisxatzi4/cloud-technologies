package gr.uom.cloud.technologies.user.dto;

import lombok.Data;

@Data
public class RegisterDealershipDto {
    private String afm;
    private String email;
    private String password;
    private String name;
    private String owner;
}
