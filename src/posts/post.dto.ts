import {
    IsString,
    Length,
    IsNotEmpty
} from "class-validator"

class PostDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 255)
    public title: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 2047)
    public content: string;
}

export {
    PostDto
}