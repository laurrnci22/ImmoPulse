package fr.lala_sedar.ImmoPulse.controllers.dto.out;

import com.fasterxml.jackson.annotation.JsonAnyGetter;

import java.util.Map;

public record VolumeEvolutionDTO(
        String month,
        Map<String, Long> volumes
) {
    @JsonAnyGetter
    public Map<String, Long> getVolumes() {
        return volumes;
    }
}
