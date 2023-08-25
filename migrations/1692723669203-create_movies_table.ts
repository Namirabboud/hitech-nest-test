import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMoviesTable1692723669203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
        )

        await queryRunner.query(
            `CREATE TABLE movies (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            release_date date,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`,
        )

        await queryRunner.query(
            `CREATE TABLE genres(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            slug VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(slug)
            );`
        )

        await queryRunner.query(
            `CREATE TABLE movies_genres (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
            genre_id UUID REFERENCES genres(id) ON DELETE CASCADE
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE IF EXISTS movies_genres;`,
        ) // reverts things made in "up" method

        await queryRunner.query(
            `DROP TABLE IF EXISTS movies;`,
        ) // reverts things made in "up" method

        await queryRunner.query(
            `DROP TABLE IF EXISTS genres;`,
        ) // reverts things made in "up" method
    }

}
