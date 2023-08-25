
## Description

Movie REST API using NestJs, Containing CRUD operations for movies and related
genres.  
A 'Movies' module has been created to segregate the distinct contexts of the application, although currently only one context is available, which pertains to movies. Two entities, 'Movie' and 'Genre,' have been established using TypeORM. Services have been implemented for both entities to handle CRUD operations.  
Within each service, the TypeORM repository is utilized to execute database queries and actions.  
Additionally, a middleware has been developed to log requests to the console.  
Moreover, DTOs (Data Transfer Objects) are employed to validate requests from the controllers.

Pagination has been incorporated into the list of movies. It's worth noting that the 'Genre' entity consists of attributes 'name' and 'slug,' with the latter being generated dynamically from the title. Slugs are employed to assign new genres to movies in the 'add' and 'update' movie APIs.

## Bootstrapping
```bash
# after insuring nvm is installed on your machine. specify the right Nodejs version
$ nvm use
```

## Installation

```bash
$ npm install
```

## Running the app

### Start the DB container
```bash
# after installing docker on your machine. start the postgres db 
$ docker-compose up -d
```

### Run migrations
```bash
# run the migrations 
$ npm run migration:run
```

### Start the application
```bash
# watch mode 
$ npm run start:dev
```



