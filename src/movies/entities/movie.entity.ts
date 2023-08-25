import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Genre} from "./genre.entity";

@Entity({name: 'movies'})
export class Movie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    release_date: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ManyToMany(() => Genre, (genre) => genre.movies)
    @JoinTable({
        name: "movies_genres", // table name for the junction table of this relation
        joinColumn: {
            name: "movie_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "genre_id",
            referencedColumnName: "id"
        }
    })
    genres: Genre[]
}
