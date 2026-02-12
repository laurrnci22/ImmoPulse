package fr.lala_sedar.ImmoPulse.controllers;


import io.micrometer.core.annotation.Counted;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Counted(value = "test_count", description = "Number of times articles with error endpoint was called")
    @GetMapping("")
    public String index() {
        return "Hello World!";
    }
}
