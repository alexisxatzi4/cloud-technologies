package gr.uom.cloud.technologies.citizen;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenRepository extends JpaRepository<Citizen, String> {

    Citizen findByAfm(String afm);

    Citizen findByEmailAndPassword(String email, String password);

}
