package fr.lala_sedar.ImmoPulse.infra.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "land_transaction")
public class LandTransactionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

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

    @Column(name = "section")
    private String section;

    @Column(name = "plot_number")
    private String plotNumber;

    @Column(name = "built_area")
    private Double builtArea;

    @Column(name = "property_type")
    private String propertyType;

    @Column(name = "land_area")
    private Double landArea;
}