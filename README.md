# Demo projet API

A RESTful API that manages videos.

## Install

Step 1: create the .env file
`cp .env.dist .env`

Step 3: install dependencies
`npm ci`

## Run

To start the database

`docker-compose up`

To start the server

`npm start`

## Migrations

To run migrations:

`node src/lib/migrations.js up`

## Fixtures

Load fixtures

`node src/lib/fixtures.js`

## Usage

Create a video
`http://0.0.0.0:3000/videos`
Payload example:
{
    "name": "Video 4",
    "status": "archived",
    "url": "https://kevinbouret.s3.eu-west-1.amazonaws.com/20a17124-759e-4c08-975c-fd4227dc9093/video.mp4"
}

Get a single video
`GET http://0.0.0.0:3000/videos/5b3e0326-c770-42c6-8338-b036ebf9fd37`

Update a video
`PATCH http://localhost:3000/videos/5b3e0326-c770-42c6-8338-b036ebf9fd37`
Payload example:
`{ "status": "archived" }`

Get presigned url
`GET http://localhost:3000/presigned-url/e7483d99-ca05-47e7-93ed-885bd0dbb773`

Delete a video
`DELETE http://localhost:3000/videos/e839801e-7cf8-4158-8db7-dbd4e2d1f723`


Json api like filtering for lists

Get videos by uuid
`http://localhost:3000/videos?filter[uuid]=5b3e0326-c770-42c6-8338-b036ebf9fd37,1020909c-8990-4dae-a85e-b3ec7e957040&filteroperator[uuid]=in`

Get videos by status
`http://localhost:3000/videos?filter[status]=draft`

Get videos ordered by status with limit
`http://localhost:3000?orderby=status&limit=3`

Videos where the title contains "test"
`http://localhost:3000/videos?filter[name]=test&filteroperator[name]=like`