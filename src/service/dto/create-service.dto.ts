import { ServiceTypeEnum } from "@prisma/client";

export class CreateServiceDto {
    name: string;
    price: number;
    time: number;
    serviceType: ServiceTypeEnum;
}
