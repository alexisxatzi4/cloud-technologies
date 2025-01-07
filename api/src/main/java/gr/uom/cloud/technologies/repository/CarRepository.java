package gr.uom.cloud.technologies.repository;

import gr.uom.cloud.technologies.car.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {}
