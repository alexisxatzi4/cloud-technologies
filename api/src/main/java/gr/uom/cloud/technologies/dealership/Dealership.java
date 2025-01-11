package gr.uom.cloud.technologies.dealership;

import com.fasterxml.jackson.annotation.JsonIgnore;
import gr.uom.cloud.technologies.car.Car;
import gr.uom.cloud.technologies.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "dealerships")
@Data
@EqualsAndHashCode(callSuper = true)
public class Dealership extends User {

    private String name;
    private String owner;

    @OneToMany(mappedBy = "dealership", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Car> cars = new ArrayList<>();
}
