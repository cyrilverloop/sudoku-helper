# Sudoku helper

A project to help you solve Sudokus.
This app does not generate Sudoku grids. You have to fill this grid based on some you have.
**This version will not tell you if there is a mistake in the grid. Maybe in a future release.**

[![License](https://img.shields.io/github/license/cyrilverloop/sudoku-helper)](https://github.com/cyrilverloop/sudoku-helper/blob/trunk/LICENSE)

**The follonwing instructions require Docker and Docker Compose.**


## Installation

Downloading the project :
```shellsession
user@host ~$ cd [PATH_WHERE_TO_PUT_THE_PROJECT] # E.g. ~/projects/
user@host projects$ git clone https://github.com/cyrilverloop/sudoku-helper.git
user@host projects$ cd sudoku-helper
```

Installing the dependencies :
```shellsession
user@host sudoku-helper$ docker compose run --rm app npm i
```


## Configuration

Add the default container configuration :
```shellsession
user@host sudoku-helper$ cp docker-compose.override.yml.dist docker-compose.override.yml
```
The default port is "3000" and the connection does not use a TLS certificate.

To use a TLS certificate in the `dev` environment, put the certificate in `./tls/server.crt`, the key in `./tls/server.key` and use `command: ["npm", "run", "dev-tls"]` in the `./docker-compose.override.yml`.

The `./docker-compose.override.yml` file and the `./tls/` directory are ignored by git, you can modify them to your needs.


## Running the app

By default, the app will be available in your browser through : http://localhost:3000/

### In development

Starting :
```shellsession
user@host sudoku-helper$ docker compose up -d
```

Stopping :
```shellsession
user@host sudoku-helper$ docker compose down
```

Running tests :
```shellsession
user@host sudoku-helper$ docker compose run --rm app npm test
```

### In production

Building :
```shellsession
user@host sudoku-helper$ docker compose run --rm prod npm run build
```

Starting :
```shellsession
user@host sudoku-helper$ docker compose up -d prod
```

Stopping :
```shellsession
user@host sudoku-helper$ docker compose down prod
```


## Using the app

On the web page, the app displays an empty Sudoku grid.
Selecting a square will let you choose its type :

- **empty** : a square without a value. By default, all squares are empty;
- **draft** : a multi-value square. To be used when you are unsure of its value;
- **answer** : a square with your answer;
- **filled** : a square with the original grid value.

Selecting `draft` will allow you to choose multiple values, while `answer` or `filled` can have only one. Selecting `empty` will erase any data in the square.

A square can be deselected by clicking / touching it again.
