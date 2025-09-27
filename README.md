# Final Database and Frameworks Project: E-commerce CRUD API

This repository contains the solution for the Final Project, demonstrating skills in **Relational Database Design (MySQL)** and **Backend Application Development (Node.js/Express)**.

The project is structured around an **E-commerce Store** use case, implementing a robust relational schema and a functional API for managing core entities.

---

## Project Structure

The repository includes two main components:

1. **`ecommerce_schema.sql`** — The complete SQL script for creating the database, tables, and constraints (**Question 1**).
2. **`ecommerce_crud_api/`** — The Node.js/Express application for performing CRUD operations on the database (**Question 2**).

---

## Part 1: Database Design (Question 1) 

The database schema, named `EcommerceDB`, models an E-commerce system with the following entities and relationships:

| Table               | Purpose                       | Primary Key                  | Key Relationships                                 |
|----------------------|-------------------------------|------------------------------|---------------------------------------------------|
| **Customers**        | Stores user details.          | `customer_id`                | **1:1** with `CustomerAddresses`                  |
| **CustomerAddresses**| Stores a customer's address.  | `address_id`                 | **1:1** with `Customers` (via `customer_id`)      |
| **Products**         | Stores items for sale.        | `product_id`                 | **1:M** with `OrderItems`                         |
| **Orders**           | Stores order information.     | `order_id`                   | **1:M** with `OrderItems`                         |
| **OrderItems**       | Links products to orders.     | `{order_id, product_id}` (composite) | **M:N** between `Orders` and `Products` |

#### Database Setup

1. Open **MySQL Workbench** (or any client of choice).
2. Run the SQL script from **`ecommerce_schema.sql`**.
   - This will create the `EcommerceDB` database and all tables + constraints.

---

## Part 2: Node.js CRUD API (Question 2)

The application is a simple RESTful API built with Node.js and Express to interact with the `Customers` and `Products` tables.

#### Setup Instructions

1. **Navigate to the API folder:**
   ```bash
   cd ecommerce_crud_api
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
Create a file named .env in the ecommerce_crud_api folder with your MySQL credentials:
```

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=EcommerceDB
```

4. Run the server:
   
```
node server.js
```


The server will start on port 3000.

### API Endpoints (CRUD)

Use Postman or Thunder Client to test the following endpoints:
Base URL: `http://localhost:3000`

|Entity	| Method	| Endpoint	| Description	| Example | Body (JSON) |
|--------------------------------------------------------------------|
| **Products**	| POST	| /api/products	| Create a new product	| {"product_name": "Wireless Keyboard", "price": 55.99, "stock_quantity": 200} |
| **Products**	| GET	| /api/products	  | Read all products	      | (No body required) |
| **Products**	| GET	| /api/products/1	| Read product with ID 1	| (No body required) |
| **Products**	| PUT	| /api/products/1	| Update product's price	| {"price": 49.99}   |
| **Products**	| DELETE	| /api/products/1	| Delete product with ID 1	| (No body required) |
| **Customers** 	| POST	| /api/customers	| Create a new customer	| {"first_name": "Alice", "last_name": "Johnson", "email": "alice@shop.com"} |
| **Customers**	| GET	| /api/customers	| Read all customers	| (No body required) |
| **Customers**	` **DELETE**	| /api/customers/5\	| Delete customer with ID 5	| (No body required) |


## Technologies Used

- Database: MySQL
- Backend: Node.js
- Framework: Express
- MySQL Client: `mysql2`
- Environment Variables: `dotenv`
