import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "./movie.entity";

@Entity({name: 'genres'})
export class Genre {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    slug: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    movies: Movie[]
}
