package gr.uom.cloud.technologies.user;

import gr.uom.cloud.technologies.citizen.Citizen;
import gr.uom.cloud.technologies.citizen.CitizenRepository;
import gr.uom.cloud.technologies.dealership.Dealership;
import gr.uom.cloud.technologies.dealership.DealershipRepository;
import gr.uom.cloud.technologies.user.dto.LoginDto;
import gr.uom.cloud.technologies.user.dto.RegisterCitizenDto;
import gr.uom.cloud.technologies.user.dto.RegisterDealershipDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final DealershipRepository dealershipRepository;
    private final CitizenRepository citizenRepository;

    @Transactional
    public void registerDealership(RegisterDealershipDto request) {
        Dealership dealership = dealershipRepository.findByAfm(request.getAfm());
        if (dealership != null) {
            throw new RuntimeException("Dealership already exists with afm " + request.getAfm());
        }

        dealership = new Dealership();

        dealership.setAfm(request.getAfm());
        dealership.setEmail(request.getEmail());
        dealership.setName(request.getName());
        dealership.setOwner(request.getOwner());
        dealership.setPassword(request.getPassword());

        dealershipRepository.save(dealership);
    }

    @Transactional
    public void registerCitizen(RegisterCitizenDto request) {
        Citizen citizen = citizenRepository.findByAfm(request.getAfm());
        if (citizen != null) {
            throw new RuntimeException("Citizen already exists with afm " + request.getAfm());
        }
        citizen = new Citizen();

        citizen.setAfm(request.getAfm());
        citizen.setEmail(request.getEmail());
        citizen.setPassword(request.getPassword());
        citizen.setFirstName(request.getFirstName());
        citizen.setLastName(request.getLastName());

        citizenRepository.save(citizen);
    }

    @Transactional
    public void login(LoginDto request) {
        Citizen citizen = citizenRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());

        if (citizen == null) {
            Dealership dealership = dealershipRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());

            if (dealership == null) {
                throw new RuntimeException("Wrong credentials");
            }
        }
    }
}
