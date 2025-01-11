package gr.uom.cloud.technologies.user;

import gr.uom.cloud.technologies.user.dto.LoginDto;
import gr.uom.cloud.technologies.user.dto.LoginResponseDto;
import gr.uom.cloud.technologies.user.dto.RegisterCitizenDto;
import gr.uom.cloud.technologies.user.dto.RegisterDealershipDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("dealerships")
    public ResponseEntity<String> registerDealership(@RequestBody RegisterDealershipDto request) {
        userService.registerDealership(request);

        return ResponseEntity.ok("Dealership registered successfully.");
    }

    @PostMapping("citizens")
    public ResponseEntity<String> registerCitizen(@RequestBody RegisterCitizenDto request) {
        userService.registerCitizen(request);

        return ResponseEntity.ok("Citizen registered successfully.");
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto request) {
        LoginResponseDto response = userService.login(request);

        return ResponseEntity.ok(response);
    }
}
