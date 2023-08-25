import {Validate} from "class-validator";
import {GenreExistsValidator} from "../validators/genre-exists.validator";

export class UpdateMovieDto {
    title: string

    description:string

    release_date:string

    @Validate(GenreExistsValidator)
    genres: string[]
}
