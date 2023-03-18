# secret-note

Allows you to share sensitive information such as passwords, secret messages, private links, etc.
The database stores this data in an encrypted form

### installation

Install dependencies

````
npm install
````

Set environment variables in .env file
- HOME_URL=http://yourdomain.com
- PORT=3000
- DATABASE_URL="postgresql://user:password@host:port/name?schema=public"

Run docker containers

````
docker-compose up
````

Synchronize database with Prisma schema

````
prisma db pull
````

Generate Prisma Client

````
prisma generate
````

Start application in production mode

````
npm run build
npm run start:prod
````
