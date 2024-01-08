
# Chat API

A simple chat application built with MongoDB, Node.js, TypeScript, and Express.js.

## Features

- **Real-time Messaging:** Users can send and receive messages in real-time.
- **User Authentication:** Users can create accounts and log in securely.
- **Multiple Chat Rooms:** Users can join different chat rooms and engage in discussions.
- **Message History:** Chat rooms retain message history for users who join later.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm (Node Package Manager) installed
- MongoDB installed and running

## Entity-Relationship Diagram (ERD)

![Chat API ERD](./docs/erd.png)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/chat-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chat-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your MongoDB database:

    - Create a MongoDB database and note the connection URI.
    - Update the `config/default.json` file with your MongoDB connection URI.

5. Start the server:

    ```bash
    npm start
    ```

The API will be running at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Get All Messages

- **Endpoint:** `GET /messages`
- **Description:** Get a list of all messages.

### 2. Send a Message

- **Endpoint:** `POST /messages`
- **Description:** Send a new message.
- **Request Body:**

    ```json
    {
      "user": "John Doe",
      "message": "Hello, world!"
    }
    ```

### 3. Get Messages in a Room

- **Endpoint:** `GET /messages/:room`
- **Description:** Get messages in a specific room.

### 4. Create a Room

- **Endpoint:** `POST /rooms`
- **Description:** Create a new chat room.
- **Request Body:**

    ```json
    {
      "name": "General"
    }
    ```

## Configuration

Update the configuration in `config/default.json` as needed.

- `MONGO_URI`: MongoDB connection URI.

## Contributing

If you'd like to contribute, please fork the repository and make changes as you see fit. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

