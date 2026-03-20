# ecommerce managemnet system<br>

## System Overview<br>

### The ecommerce managemnet system allows users to:<br>
1.Register and log in with their credentials.<br>
2.View a list of available products.<br>
3.Add products to cart then to checkout and then to orders<br>
4.user can choose their quantity.<br>

### The System Supports two roles:

1. Admin

  Add products
  Edit products
  Delete products
  View NUmber of users added

2. Customer

  View Available products
  Add  products to cart
  can do checkout of products
  can see past orders 
  
### This Project uses localstorage to get and set data.
### This is a Multipage Application.

Approach Of this Project

In this Project I followed a structured approach:
  HTML for Structure
  javascript for logic

Folder Structure :

  Backend  - Database Design SQL code and er diagram

  docs - Fsrs document

  Frontend:
         -index.html
         -/assests/images
         -/src/pages
         -/src/scripts
         -/src/authorization
         -/src/components
         -/src/styles
         -/src/utils
         
        
         


Database Structure:-<br>

The system is designed based on MySQL database, with the following tables:<br>
1. users: Stores user details for authentication and user actions.<br>
        -id: Primary Key, auto-increment.<br>
        -name: Name of the user.<br>
        -email: Unique email for login.<br>
        -password: varchar.
        -role: enum(admin or customer)<br>



2. products: Stores product details such as name, price.<br>
        -id: Primary Key, auto-increment.<br>
        -name: products name .<br>
        -category: products category .<br>
        -price per product.<br>

3. cart: choosed products are aadded in cart.<br>
        -id: Primary Key, auto-increment.<br>
        -user_id: Foreign Key, references users(id).<br>
        -products_id: Foreign Key, references products(id).<br>

4. order: stores all order products
        - id: Primary Key, auto-increment.<br>


5. There are many other tables also but that are not used in website as of now
   in future it will be used.


Query Deisgn Approach

Queries are designed to support real business operations Such as:

- Creating users, products, cart ,checkout and orders




## API Structure<br>

Although backend is not implemented, the API contract is defined using Swagger to demonstrate RESTful thinking.<br>

For in this Project we can use
- Authentication
  -- POST /api/register
  -- POST /api/login

- products
  -- GET /api/products
  -- POST /api/products
  -- PUT /api/products/{id}
  -- DELETE /api/products{id}
category
  -- GET /api/category
  -- POST /api/category
  -- PUT /api/category/{id}
  -- DELETE /api/category{id}

- cart
  -- POST /api/cart
  -- GET /api/cart
- orders
  -- POST /api/orders
  -- GET /api/orders

<br>

## Authentication Approach

 - Users authenticate using credentials
 - After login, the system checks email and password are same with signup credentials or not.

 Benefits:
 - Secure Communication
-preventys data leaks

## Authorization Approach

- Role Based Access Control is used.

- Admin: Manage products
- Customer: View and but products

## Authorization Design

Authrization is implemented using a simple userid and date.now function to generate a unique id . Since this project does not include a backend server, authentication is handled entirely on the cilent side using:
- localStorage
- unique customer id
- Role-based access control

The purpose is to demonstarate authentication flow understanding.


### till now this not designed for production 
as there are many fetaures that need to be added.



## Future Assumptions (Planned Improvements)<br>

System can be upgraded with:<br>
--payment page<br>
--payment calculation<br>
-- multiple user handling<br>
--review page etc.<br>


## how to use the project
-here we will use html, js , tailwind css
-clone the repo
- install tailwind css in vs code
- Start Tailwind CSS (Watch Mode)
-npm run dev

-Start TypeScript Compiler
-npm run dev:ts

-Open the Project
-Open the Project

- Build for Production
-npm run build


- Register as Admin or Customer
- admin credentials are:-
      - email-- "admin@gmail.com"
      - password-- "1234567890"

- for customer-
      - register with your own credentials
      -then login 


-play with the website



## Conclusion

This Deisgn focuses on:
- Real world data modeling
- Clean and maintainable API architecture

<br>