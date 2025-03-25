<p align="center">
  <a href="https://www.avans.nl/" target="blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Avans_Hogeschool_Logo.svg" width="300" alt="Avans Hogeschool Logo" />
  </a>
</p>

<p align="center">
  De gecombineerde eindopdracht van DEVOPS en WEBS5 🐳 ☁️
</p>

# Development setup

Checkout `package.json` for all available NPM command.

## Installation

1. Create a copy of `.env.example` and rename it to `.env`.
2. Update the environment variables if applicable.
3. Open the project's terminal and run the following command:

```bash
$ docker compose build
$ docker compose up # Optional: add the -d flag to detach the terminal
```

## Validation

```bash
$ curl -Is http://localhost:3000 | head -n 1
HTTP/1.1 200 OK
$ curl -Is http://localhost:15672 | head -n 1
HTTP/1.1 200 OK
```
