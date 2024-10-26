# ASSA Interview React + Redux + Tailwind

In this project, I have created a simple React + Redux application that fetches data from
the [MOCK API IO](https://6172cfe5110a740017222e2b.mockapi.io/elements/) API and Json Server to mock a database for
Tasks CRU operations and displays it as a list of task or profiles elements. The application
uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Run Instructions for the project

- Execute the next commands lines in a terminal to `Run Project` like this:

```
yarn
yarn dev
```

- Then execute this command line in another terminal to up `Mocked Database` like this:

```
json-server --watch db.json
```

- Open your browser and go to `http://localhost:5173/` to see the project running.
- Open your browser and go to `http://localhost:3000/` to see the mocked database running.

## Features

- Fetch data from the [MOCK API IO](https://6172cfe5110a740017222e2b.mockapi.io/elements/) API.
- Fetch data from the Json Server to mock a database for Tasks CRU operations.
- Display the fetched data as a list of task or profiles elements.
- Add a new task or profile element.
- Edit an existing task.
