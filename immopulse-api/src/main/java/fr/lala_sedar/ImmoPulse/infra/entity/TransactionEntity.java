package fr.lala_sedar.ImmoPulse.infra.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "transaction")
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mutation_date")
    private LocalDate mutationDate;

    @Column(name = "mutation_type")
    private String mutationType;

    @Column(name = "property_value")
    private Double propertyValue;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "street_name")
    private String streetName;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "city")
    private String city;

    @Column(name = "department_code")
    private String departmentCode;

    @Column(name = "property_type")
    private String propertyType;

    @Column(name = "living_area")
    private Integer livingArea;

    @Column(name = "rooms_count")
    private Integer roomsCount;

    @Column(name = "land_area")
    private Integer landArea;
}