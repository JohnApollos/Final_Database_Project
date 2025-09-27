# E-commerce CRUD API (Node.js & Express)

This project implements a simple CRUD (Create, Read, Update, Delete) API for an E-commerce database using Node.js, the Express framework, and MySQL.

## Setup Instructions

1.  **Prerequisites:** Ensure you have Node.js, npm, and a running MySQL server installed.
2.  **Database:** You must have the `EcommerceDB` schema (from Assignment Question 1) created on your MySQL server.
3.  **Clone/Download:** Download or clone this repository.
4.  **Install Dependencies:**
    ```bash
    npm install
    ```
5.  **Environment Variables:** Create a file named `.env` in the root directory and add your database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=EcommerceDB
    ```
6.  **Run the Server:**
    ```bash
    node server.js
    ```
    The server will start on port 3000.

## API Endpoints

The API supports CRUD operations for the `Products` and `Customers` entities.

| Entity | Method | Endpoint | Description | Example Request Body |
| :--- | :--- | :--- | :--- | :--- |
| **Products** | `POST` | `/api/products` | **Create** a new product | `{"product_name": "New Laptop", "price": 1200.00}` |
| **Products** | `GET` | `/api/products` | **Read** all products | |
| **Products** | `GET` | `/api/products/:id` | **Read** a single product | |
| **Products** | `PUT` | `/api/products/:id` | **Update** a product | `{"price": 1150.00}` |
| **Products** | `DELETE`| `/api/products/:id` | **Delete** a product | |
| **Customers** | `POST` | `/api/customers` | **Create** a new customer | `{"first_name": "Alice", "last_name": "Smith", "email": "alice@example.com"}` |
| **Customers** | `GET` | `/api/customers` | **Read** all customers | |
| **Customers** | `PUT` | `/api/customers/:id` | **Update** a customer | `{"phone_number": "555-1234"}` |
| **Customers** | `DELETE`| `/api/customers/:id` | **Delete** a customer | |

### Testing

You can use a tool like Postman or VS Code's Thunder Client to test the endpoints.

---

### Final Submission

1.  **Commit and Push:** Commit all your files (`server.js`, `.env`, `routes/products.js`, `routes/customers.js`, `package.json`, `package-lock.json`, and `README.md`) to your **GitHub repository**.
2.  **Submit URL:** Provide the link to your repository for grading.