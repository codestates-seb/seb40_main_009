package be.wiselife.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class AmountResponseDto<T> {
    private List<T> data;
    private int total;

    public AmountResponseDto(List<T> data, double total) {
        this.data = data;
        this.total = (int)total;
    }
}
