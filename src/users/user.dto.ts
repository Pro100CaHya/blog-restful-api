import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length
} from "class-validator";

class UserDto {
    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    public password: string;
}

export {
    UserDto
}