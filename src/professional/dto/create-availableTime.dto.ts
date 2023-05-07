export class CreateAvailableTimeDto {
    professionalId: number;
    sunday?: number[];
    monday?: number[];
    tuesday?: number[];
    wednesday?: number[];
    thursday?: number[];
    friday?: number[];
    saturday?: number[];
    exceptionDate?: Date[];
}
