Travel Tracker

Travel Tracker is a simple web application that allows users to mark countries they have visited and store them in a PostgreSQL database. The project uses Node.js, Express, EJS, and PostgreSQL on the backend. An SVG world map is used to display the interface.

Features

Interactive world map interface

Add visited countries

Store entries in a PostgreSQL database

View previously added countries

Simple and clean layout

Easy to extend or customize

Technologies Used
Frontend

HTML

CSS

SVG world map

EJS templates

Backend

Node.js

Express

PG module

Database

PostgreSQL

Project Structure
travel_tracker_proj/
  public/
  views/
  -index.ejs
  -new.ejs
  index.js
  package.json
  package-lock.json
  README.md


  Setup Instructions
1. Clone the repository

```bash
git clone https://github.com/your-username/traveltracker.git
cd traveltracker



```
2.Install dependencies
```bash

npm install


```
3.Create the Database

```bash
CREATE DATABASE travel_tracker;
```

4.Create the tables:

```sql
CREATE TABLE users(id SERIAL PRIMARY KEY,first_name varchar(50) UNIQUE);
CREATE TABLE codes(id SERIAL PRIMARY KEY,country_code char(2) UNIQUE,country VARCHAR(45) UNIQUE);
CREATE TABLE country(id SERIAL PRIMARY KEY,country_code char(2),user_id INTEGER, UNIQUE(uawe_id,country_code));
```

5.Open index.js and update the credentials:

```js
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "travel_tracker",
    password: "YOUR_PASSWORD",
    port: 5432
});


```
6.Start the Server:

```bash
nodemon index.js

```

The server will start at http://localhost:8000

How It Works

The user interacts with the world map.

Selecting a country sends a request to the backend.

The backend inserts the selected country into the PostgreSQL table.

The countries stored in the database are displayed on the page.
