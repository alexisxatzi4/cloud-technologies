package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.dealership.Dealership;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String make;
    private String model;
    private String fuel;
    private int engine;
    private int seats;
    private double price;
    private String description;
    private int total;
    @ManyToOne
    @JoinColumn(name="dealership_afm", nullable=false)
    private Dealership dealership;
}
