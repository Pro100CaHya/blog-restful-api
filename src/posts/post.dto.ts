import {
    IsString,
    Length,
    IsNotEmpty
} from "class-validator"

class PostDto {
    @IsString()
    @IsNotEmpty()
    @Length(255)
    public title: string;

    @IsString()
    @IsNotEmpty()
    @Length(2047)
    public content: string;

    @IsString()
    @IsNotEmpty()
    public userId: string;
}

export {
    PostDto
}