package gr.uom.cloud.technologies.citizen;

import gr.uom.cloud.technologies.reservation.Reservation;
import gr.uom.cloud.technologies.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "citizens")
@Data
@EqualsAndHashCode(callSuper = true)
public class Citizen extends User {

    private String firstName;

    private String lastName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "citizen_afm", updatable = false)
    private List<Reservation> reservations = new ArrayList<>();

}