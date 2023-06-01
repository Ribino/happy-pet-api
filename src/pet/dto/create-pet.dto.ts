import {
  PetFurEnum,
  PetSexEnum,
  PetTemperamentEnum,
  PetTypeEnum,
} from '@prisma/client';

export class CreatePetDto {
  clientId: number;
  name: string;
  birthdate: Date;
  fur: PetFurEnum;
  color: string;
  race: string;
  neutered: boolean;
  breed: string;
  sex: PetSexEnum;
  temperament: PetTemperamentEnum;
  type: PetTypeEnum;
  weight: number;
  height: number;
  imagePath: string;
}
