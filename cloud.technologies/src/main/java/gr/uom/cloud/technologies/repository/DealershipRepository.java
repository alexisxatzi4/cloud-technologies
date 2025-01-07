package gr.uom.cloud.technologies.repository;

import gr.uom.cloud.technologies.dealership.Dealership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealershipRepository extends JpaRepository<Dealership, Integer> {
    Dealership findByAfm(Integer afm);
}
