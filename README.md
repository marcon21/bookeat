# BookEat

BookEat is a software solution designed to streamline and enhance the management of various types of food establishments, including restaurants, trattorias, fast food places, bars, and more. In today's digital age, businesses are constantly seeking innovative ways to improve their services, and our team is dedicated to providing simple and efficient digital solutions for the restaurant industry.

## Motivation

The culinary field is a significant and attractive sector in our country, both from a tourist and cultural perspective. However, the management of restaurant services can sometimes be a weak point, leading to issues such as long waiting times for orders or disorganization in the kitchen, resulting in delayed service. We aim to address these challenges by developing software that offers a user-friendly interface and effective tools for menu presentation and modification, table reservations, order management (both online and on-site), bill calculation, and kitchen order organization.

## Features

- Menu management: Easily present and modify menus, including adding, updating, and removing items.
- Table reservations (WIP): Allow customers to book tables in advance, improving the dining experience for both customers and restaurant staff.
- Order management: Streamline the process of taking orders, whether it's done online or on-site. Ensure accurate and timely communication between the front-of-house staff and the kitchen.
- Bill calculation: Automatically calculate bills based on the items ordered and any additional charges or discounts applied.
- Kitchen order organization: Optimize the workflow in the kitchen, ensuring smooth and efficient preparation and delivery of dishes.

## Documentation

For detailed documentation, including API specifications and guidelines, please visit our [API Documentation](https://bookeat.docs.apiary.io).

## Getting Started

To run the BookEat project locally, please follow these steps:

### Prerequisites

- Docker and docker-compose (V2)

### Running the Project

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the project directory.
3. Run the following command to start the project:

```sh
docker compose up --build
```

4. The application will start, and you can access the following components:

   - Frontend: http://localhost:4000
   - Mongo Express (MongoDB web-based administration tool): http://localhost:8081
   - Backend: http://localhost:3001

### Credentials

To access the web app or test the APIs, you can use the following default credentials for the development environment:

Account Type | Email                | Password
------------ | -------------------- | -------------
Manager      | manager@gmail.com    | qwertyQ1!
Sala         | sala@gmail.com       | qwertyQ1!
Cucina       | cucina@gmail.com     | qwertyQ1!
Tavolo       | tavolo@gmail.com     | qwertyQ1!
Utente Loggato | utente@gmail.com   | qwertyQ1!

## Testing

To run backend API tests, follow these steps:

1. Open a terminal and navigate to the project directory.
2. Run the following command to access the backend container:

```sh
docker exec -it bookeat_backend_1 bash
```

3. Inside the container, run the following command to execute the tests:

```sh
npm run test
```

4. After the tests are completed, the test report will be available at `bookeat/backend/app/report/test-report.html`.

## Updating Dependencies

If there are changes to the project's dependencies, follow these steps to rebuild the containers:

1. Open a terminal and navigate to the project directory.
2. Run the following command to rebuild the containers:

```sh
docker compose up --build
```

3. In another terminal, run the following command to access the backend or frontend container for updating dependencies:

For backend dependencies

:

```sh
docker exec -it bookeat_backend_1 bash
```

For frontend dependencies:

```sh
docker exec -it bookeat_frontend_1 /bin/sh
```

4. Inside the container, run the following command to install the updated dependencies:

```sh
npm i
```

5. Stop the containers and run the following command to rebuild them:

```sh
docker compose up --build
```

With these steps, you will have the latest dependencies installed and the project up and running.

----------------

Feel free to explore the BookEat repository for further details and contributions. We are committed to delivering an efficient and user-friendly software solution for the restaurant industry.