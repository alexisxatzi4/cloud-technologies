package gr.uom.cloud.technologies.dealership;

import gr.uom.cloud.technologies.car.Car;
import gr.uom.cloud.technologies.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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

    @OneToMany(mappedBy = "dealership")
    private List<Car> cars = new ArrayList<>();
}
