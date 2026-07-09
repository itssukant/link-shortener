# Link Shortener Service

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Overview

This project implements a lightweight URL shortening service designed with efficiency and minimalism in mind. It transforms long, cumbersome URLs into short, easy-to-share links using Base62 encoding. The service also provides basic click analytics, all built from scratch using pure Node.js HTTP, demonstrating a deep understanding of core server-side principles without relying on external frameworks.

## Features

*   **URL Shortening**: Convert long URLs into concise, unique Base62-encoded short codes.
*   **Base62 Encoding**: Utilizes a custom Base62 (0-9, a-z, A-Z) encoding scheme for compact and human-readable short links.
*   **Click Analytics**: Tracks the number of clicks for each shortened URL, providing insights into link engagement.
*   **Pure Node.js HTTP**: Developed entirely with Node.js's built-in `http` module, showcasing a zero-dependency approach to server creation.
*   **RESTful API**: Exposes a clean and intuitive API for shortening URLs and retrieving analytics.
*   **Zero External Dependencies**: Operates without any third-party libraries or frameworks, emphasizing core JavaScript and Node.js capabilities.

## Tech Stack

| Technology   | Description                                                        |
| :----------- | :----------------------------------------------------------------- |
| **Node.js**  | Server-side JavaScript runtime for building the backend.           |
| **JavaScript** | Primary programming language for all logic.                        |
| **REST APIs**| Architectural style for exposing URL shortening and analytics endpoints. |
| **System Design**| Principles applied for efficient URL generation, storage, and retrieval. |

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/link-shortener.git
    cd link-shortener
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Run tests (Optional):**
    ```bash
    npm test
    ```

## Usage

After installation, you can start the server and interact with the API.

1.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000` (or the port configured internally).

2.  **Shorten a URL (POST /shorten):**
    Send a POST request to `/shorten` with the `longUrl` in the request body.

    **Request Example (using curl):**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"longUrl": "https://www.example.com/very/long/path/to/a/resource/that/needs/shortening"}' http://localhost:3000/shorten
    ```

    **Response Example:**
    ```json
    {
        "longUrl": "https://www.example.com/very/long/path/to/a/resource/that/needs/shortening",
        "shortUrl": "http://localhost:3000/abcde"
    }
    ```

3.  **Access a Shortened URL (GET /:shortCode):**
    Navigate to the shortened URL in your browser or make a GET request. The service will redirect you to the original long URL and increment the click count.

    **Example:**
    ```
    http://localhost:3000/abcde
    ```

4.  **Get Click Analytics (GET /analytics/:shortCode):**
    Send a GET request to `/analytics/:shortCode` to retrieve the click count for a specific shortened URL.

    **Request Example (using curl):**
    ```bash
    curl http://localhost:3000/analytics/abcde
    ```

    **Response Example:**
    ```json
    {
        "shortCode": "abcde",
        "longUrl": "https://www.example.com/very/long/path/to/a/resource/that/needs/shortening",
        "clicks": 5
    }
    ```

## Project Structure

.
├── server.js           # Main server logic, handles HTTP requests and routing.
├── shortener.js        # Core logic for URL shortening, Base62 encoding, and data storage.
├── package.json        # Project metadata and dependencies.
└── test/               # Directory for unit tests.
    └── shortener.test.js # Tests for the shortener core logic.

## Interview Q&A

Here are some realistic questions a recruiter might ask about this project, along with strong answers to demonstrate your understanding.

1.  **Q: You mentioned "zero dependencies" and "pure Node HTTP". What motivated this design choice, and what are its pros and cons compared to using a framework like Express.js?**
    *   **A:** My primary motivation was to gain a deeper understanding of Node.js's core capabilities and the underlying HTTP protocol. Building a server from scratch without frameworks like Express.js allowed me to manage request parsing, routing, and response handling directly, which is invaluable for learning.
        The pros include minimal overhead and better performance since there's no abstraction layer, greater control over every aspect of the server, and a stronger grasp of fundamental concepts. However, the cons are increased development time due to re-implementing common functionalities, a steeper learning curve for new developers joining the project, and potentially more verbose code compared to the concise syntax offered by frameworks. For a production system with complex routing or middleware needs, Express.js would typically be more efficient.

2.  **Q: How did you implement Base62 encoding for the short codes, and what considerations did you have regarding collision resistance and scalability?**
    *   **A:** I implemented Base62 encoding by mapping a numerical ID to a string using a custom alphabet of 62 characters (0-9, a-z, A-Z). For collision resistance, the core idea is to ensure that the initial numerical ID is unique. In this project, for simplicity, I used a simple counter incremented for each new URL. For a more robust solution, I'd consider using a distributed unique ID generator (like UUIDs or a dedicated service like Twitter's Snowflake), or hashing the long URL to produce a unique identifier, then encoding that hash in Base62.
        Scalability is a critical consideration. While a simple counter works for a small project, it becomes a bottleneck in a distributed system. A more scalable approach would involve using a database's auto-incrementing ID for the numerical base, or generating IDs that are guaranteed unique across multiple instances. If a hash-based approach is used, I'd implement a collision resolution strategy, such as appending a small random string to the hash and retrying the encoding if a collision occurs.

3.  **Q: Describe your approach to click analytics. How is the data stored and retrieved, and what are the potential challenges or future improvements for this feature?**
    *   **A:** In this project, click analytics are managed simply by incrementing a counter associated with each `shortCode` whenever a shortened URL is accessed. The mapping of `shortCode` to `longUrl` and its `clickCount` is stored in-memory using a JavaScript object (effectively a hash map).
        For storage, this in-memory approach is fine for a demonstration but isn't persistent; data would be lost if the server restarts. For a production environment, this data would need to be stored in a persistent database, such as Redis for high-speed counter increments, or PostgreSQL/MongoDB for more complex analytics queries.
        Potential challenges include handling high concurrency (multiple clicks simultaneously), ensuring data consistency across multiple server instances, and scaling the storage solution as the number of URLs and clicks grows. Future improvements could involve storing more granular data, like timestamps, user agents, or geographic locations for each click, and implementing a robust data aggregation and visualization layer.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
