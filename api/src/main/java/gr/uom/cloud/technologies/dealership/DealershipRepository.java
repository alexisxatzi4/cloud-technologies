package gr.uom.cloud.technologies.dealership;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealershipRepository extends JpaRepository<Dealership, String> {
    Dealership findByAfm(String afm);
}
