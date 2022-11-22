package be.wiselife.dto;

import java.util.List;

public class AmountResponseDto<T> {
    private List<T> data;
    private int total;

    public AmountResponseDto(List<T> data, int total) {
        this.data = data;
        this.total = total;
    }
}
