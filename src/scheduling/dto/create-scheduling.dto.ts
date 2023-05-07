export class CreateSchedulingDto {
    id: number;
    date: Date;
    start: Number;
    end: Number;
    confirmed: boolean;
    performed: boolean;
    petId: number;
    professionalId: number;
    serviceId: number;
}
