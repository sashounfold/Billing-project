import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class BillingApplication {

    private Map<String, LocalDateTime> timeTrackingData = new HashMap<>();

    public static void main(String[] args) {
        SpringApplication.run(BillingApplication.class, args);
    }

    @PostMapping("/start-tracking")
    public Map<String, String> startTracking(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        timeTrackingData.put(userId, LocalDateTime.now());
        return Map.of("message", "Tracking started");
    }

    @PostMapping("/stop-tracking")
    public Map<String, Long> stopTracking(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        LocalDateTime startTime = timeTrackingData.get(userId);
        long duration = ChronoUnit.SECONDS.between(startTime, LocalDateTime.now());
        return Map.of("duration", duration);
    }

    @PostMapping("/calculate-cost")
    public Map<String, Double> calculateCost(@RequestBody Map<String, Long> request) {
        long duration = request.get("duration");
        double costPerSecond = 0.05;
        double totalCost = duration * costPerSecond;
        return Map.of("totalCost", totalCost);
    }

    @PostMapping("/generate-invoice")
    public Map<String, String> generateInvoice(@RequestBody Map<String, Object> request) {
        String userId = (String) request.get("userId");
        double totalCost = (double) request.get("totalCost");
        return Map.of("message", "Invoice generated for user " + userId + ", total cost: " + totalCost);
    }
}
