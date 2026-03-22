package fr.lala_sedar.ImmoPulse.controllers.dto.in;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LandTransactionFilterDto {
    private String type;
    private String department;
    private Double minPrice;
    private Double maxPrice;
    private Double minSurface;
    private Integer page = 0;
    private Integer size = 20;


    public int getPage() {
        return page == null || page < 0 ? 0 : page;
    }

    public int getSize() {
        return size == null || size < 1 ? 20 : size;
    }
}