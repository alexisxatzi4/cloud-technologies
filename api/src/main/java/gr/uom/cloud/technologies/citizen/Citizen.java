package gr.uom.cloud.technologies.citizen;

import gr.uom.cloud.technologies.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "citizens")
@Data
@EqualsAndHashCode(callSuper = true)
public class Citizen extends User {

    private String firstName;

    private String lastName;

}