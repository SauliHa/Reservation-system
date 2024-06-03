# reservation-system


## Description
This is a web app project of a reservation system to a nonexistent bowling sports center "super-sport" (no relation to any real company with the same name). 

The aim of the project is to create a functional front end, back end and database to let users reserve times to different bowling lanes. To make that happen the user needs to first create an account and log in. On top of those features the app has the usual web page features like a front page which has information about the sports center and an userpage where the user can change their info and see their past and future reservations listed.

Both the front and back end code uses TypeScript and is made with the Node package manager (npm). The front end works on a vite react project using TypeScript + SWC compiler. Back end uses an express server and runs on a node server. The database was built for a postgres sql database. The styling of the web-pages is done mainly with Bootstrap but we also made some of our own css stylings.

###Here is an example image of the reservation calendar

![Reservation calendar](image.png)

## Installation
To use this project download the contents and run npm install on both front-end and back-end folders to install the required dependencies. You also need to install postgres sql https://www.postgresql.org/ and create and ENV file in the back-end folder that includes PORT, SECRET and PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE envs for your database. You can also run npm build on the front-end and tlc -b in the back-end to make a build out of the project folders.

## Support
To get help for this project message one of the creators here on Gitlab.

## Roadmap
There are currently no future plans to develop this project further.

## Authors and acknowledgment
The creators of this project are @PekkaKalpio @SauliHa @WinterCivilian and $lpaukkala. We made this project as a reference to show our technical skills and ability to work in a team. 

We would like to thank everyone who has worked with all the modules and tools used in this project.

## License
For open source projects, say how it is licensed.

## Project status
The project is finished in it's current state.