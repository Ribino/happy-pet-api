import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateClientDto extends CreateUserDto{
   cep: string;
   address: string;
   district: string;
}
