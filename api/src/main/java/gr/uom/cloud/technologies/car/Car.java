package gr.uom.cloud.technologies.car;

import gr.uom.cloud.technologies.dealership.Dealership;
import gr.uom.cloud.technologies.reservation.Reservation;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "cars")
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "car_id", updatable = false)
    private List<Reservation> reservations = new ArrayList<>();
}
