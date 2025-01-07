package gr.uom.cloud.technologies.user;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public class User {

    @Id
    private String afm;

    @Column(unique = true)
    private String email;

    private String password;

}
