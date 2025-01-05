package gr.uom.cloud.technologies.dealership;

import gr.uom.cloud.technologies.car.Car;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="DEALERSHIP")
public class Dealership {
    @Id
    private int afm;
    private String name;
    private String owner;
    private String password;
    @OneToMany(mappedBy = "dealership")
    private List<Car> cars =new ArrayList<>();
}
