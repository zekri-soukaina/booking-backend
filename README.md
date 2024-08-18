---
[Check deployed version here!](https://booking-backend-t3wv.onrender.com/)

# Online Booking App API

## Description

This project aims to design and develop a RESTful API for an online booking app using Express.js and Prisma. The focus is on building out the back-end part of the application, which includes key aspects such as route handling, middleware for tasks like logging and authentication, as well as error handling.

The models are built using Prisma, and the data is read, modified, and deleted through the Prisma client as well (in the services). You'll be starting from scratch, building a comprehensive backend solution.

## Features

The app allows users to:

- **Authentication:**

  - Login

- **User Management:**

  - Create, view, update, and delete users

- **Host Management:**

  - Create, view, update, and delete hosts

- **Property Management:**

  - Create, view, update, and delete properties

- **Amenity Management:**

  - Create, view, update, and delete amenities

- **Booking Management:**

  - Create, view, update, and delete bookings

- **Review Management:**
  - Create, view, update, and delete reviews

## Models

Here are the main models and their relationships:

### User

- `id` (string, UUID, PK)
- `username` (string, unique)
- `password` (string)
- `name` (string)
- `email` (string)
- `phoneNumber` (string)
- `pictureUrl` (string)

### Host

- `id` (string, UUID, PK)
- `username` (string, unique)
- `password` (string)
- `name` (string)
- `email` (string)
- `phoneNumber` (string)
- `pictureUrl` (string)
- `aboutMe` (string)
- `listings` (Property[])

### Property

- `id` (string, UUID, PK)
- `hostId` (string, UUID, FK)
- `title` (string)
- `description` (string)
- `location` (string)
- `pricePerNight` (decimal)
- `bedroomCount` (int)
- `bathRoomCount` (int)
- `maxGuestCount` (int)
- `rating` (int)

### Amenity

- `id` (string, UUID, PK)
- `name` (string)

### Booking

- `id` (string, UUID, PK)
- `userId` (string, UUID, FK)
- `propertyId` (string, UUID, FK)
- `checkInDate` (datetime)
- `checkOutDate` (datetime)
- `numberOfGuests` (int)
- `totalPrice` (int)
- `bookingStatus` (string)

### Review

- `id` (string, UUID, PK)
- `userId` (string, UUID, FK)
- `propertyId` (string, UUID, FK)
- `rating` (int)
- `comment` (string)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/booking-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd booking-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   DATABASE_URL=your-database-url
   PORT=your-port
   ```

5. Run the Prisma migrations to set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the server:
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can use the following endpoints to interact with the API:

- **Authentication:**

  - `POST /login`: Login

- **User Management:**

  - `POST /users`: Create a new user
  - `GET /users`: Get all users
  - `GET /users/:id`: Get a single user by ID
  - `PUT /users/:id`: Update a user by ID
  - `DELETE /users/:id`: Delete a user by ID

- **Host Management:**

  - `POST /hosts`: Create a new host
  - `GET /hosts`: Get all hosts
  - `GET /hosts/:id`: Get a single host by ID
  - `PUT /hosts/:id`: Update a host by ID
  - `DELETE /hosts/:id`: Delete a host by ID

- **Property Management:**

  - `POST /properties`: Create a new property
  - `GET /properties`: Get all properties
  - `GET /properties/:id`: Get a single property by ID
  - `PUT /properties/:id`: Update a property by ID
  - `DELETE /properties/:id`: Delete a property by ID

- **Amenity Management:**

  - `POST /amenities`: Create a new amenity
  - `GET /amenities`: Get all amenities
  - `GET /amenities/:id`: Get a single amenity by ID
  - `PUT /amenities/:id`: Update an amenity by ID
  - `DELETE /amenities/:id`: Delete an amenity by ID

- **Booking Management:**

  - `POST /bookings`: Create a new booking
  - `GET /bookings`: Get all bookings
  - `GET /bookings/:id`: Get a single booking by ID
  - `PUT /bookings/:id`: Update a booking by ID
  - `DELETE /bookings/:id`: Delete a booking by ID

- **Review Management:**
  - `POST /reviews`: Create a new review
  - `GET /reviews`: Get all reviews
  - `GET /reviews/:id`: Get a single review by ID
  - `PUT /reviews/:id`: Update a review by ID
  - `DELETE /reviews/:id`: Delete a review by ID

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
