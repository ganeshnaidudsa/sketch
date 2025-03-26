# Sketch Application

## Overview
The Sketch Application is a collaborative drawing platform where multiple users can join a room and draw together in real-time. It is designed to foster creativity and teamwork, allowing users to express their ideas visually.

## Features
- **Real-Time Collaboration**: Multiple users can draw simultaneously in the same room.
- **Custom Rooms**: Users can create or join specific rooms to collaborate with others.
- **Interactive Drawing Tools**: A variety of drawing tools and colors to enhance creativity.
- **Responsive Design**: Works seamlessly across devices, including desktops, tablets, and mobile phones.
- **Secure Authentication**: User accounts are protected with JWT-based authentication.
- **Persistent Storage**: Save and load drawings for future use.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ganeshnaidudsa/sketch.git
    ```
2. Navigate to the project directory:
    ```bash
    cd sketch
    ```
3. Install dependencies:
    ```bash
    pnpm install
    ```
4. Start the application:
    ```bash
    pnpm dev
    ```

## Configuration
To configure the application, you need to set up environment variables in a `.env` file. Below are the required variables:

1. Create a `.env` file in the root directory of the project.
2. Add the following variables to the file:

    ```env
    # Server Configuration
    PORT=3000

    # Frontend Configuration
    NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
    NEXT_PUBLIC_WS_URL="ws://localhost:3000"
    NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"

    # WebSocket Configuration
    WS_PORT=3001

    # Database Configuration
    DATABASE_URL="your-database-url"

    # JWT Configuration
    JWT_SECRET="your-secret-key"
    ```

3. Save the file and restart the application to apply the changes.

> **Note**: Replace the placeholder values with your actual configuration details.

## Usage
1. Open the application in your browser and create an account.
2. Create or join a room by entering a room name.
3. Start drawing and collaborate with others in real-time.
4. Save your drawings for future reference or share them with others.

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Express.js
- **WebSocket**: `ws` (npm library)
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)

## Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.



## Contact
For any inquiries or support, feel free to reach out:
- **Email**: your-email@example.com
- **GitHub**: [ganeshnaidudsa](https://github.com/ganeshnaidudsa)
