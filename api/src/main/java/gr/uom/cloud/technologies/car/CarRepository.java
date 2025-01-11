package gr.uom.cloud.technologies.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    @Query("SELECT c FROM Car c WHERE " +
            "(:make IS NULL OR c.make = :make) AND " +
            "(:model IS NULL OR c.model = :model) AND " +
            "(:fuel IS NULL OR c.fuel = :fuel) AND " +
            "(:engine IS NULL OR c.engine = :engine) AND " +
            "(:seats IS NULL OR c.seats = :seats) AND " +
            "(:price IS NULL OR c.price = :price) AND " +
            "(:dealershipAfm IS NULL OR c.dealership.afm = :dealershipAfm) " +
           "order by c.createdAt desc "
    )
    List<Car> filterCars(
            @Param("make") String make,
            @Param("model") String model,
            @Param("fuel") String fuel,
            @Param("engine") Integer engine,
            @Param("seats") Integer seats,
            @Param("price") Double price,
            @Param("dealershipAfm") String dealershipAfm
    );
}
