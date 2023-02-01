# Food Store - Mini Food

## User Stories

### Background

FoodStore is an online sales application. FoodStore specializes in providing fresh fruits and vegetables to serve the needs of customers.
With FoodStore, consumers can view and buy goods directly on the application without having to go far to buy, and also save customers' time.
FoodStore will be a place that fully meets, diverse in products, quality and reasonable prices.
At the same time FoodStore will make it possible for you to sell your own food items in the future.

### Authentication [done]

- As a user, i can sign in with my email and pasword.
- As a user, i can register for a new account, email, password.
- As a user, i can stay signed in with refreshing page.

### User

- As a user and as is a customer, I can see the user's profile.
- As a user and as is a customer, I can update my profile.
- As a user and as of a seller , I can see my profile.
- As a user and as of a seller , I can update about my store as logo, name, company, phone, address,.. etc

### Product

- As a use and as is a customer, I can see a list of all products.
- As a use and as is a customer, I can search according to the product name
- As a user and as of a customer, I can see the details of a product.
-
- As a user and as of a Admin , I can see the list of products I'm selling.
- As a user and as of a Admin , I can add new products.
- As a user and as of a Admin , I can update the information of a product I'm selling
- As a user and as of a Admin , I can delete my product.

### Cart

- As a user and as of a customer, I can add products to the cart.
- As a user and as of a customer, I can see the list of products in the cart.
- As a user and as of a customer, I can add or reduce the number of products in the cart.
- As a user and as of a customer, I can remove the product in the cart.

### Order

- As a user and as of a customer, I can order an order to my address and phone number.
- As a user and as of a customer, I can see the list of my order.
- As a user and as of a Admin , I can see the list of orders
- As a user and as of a Admin , I can update the status for my orders.

## EndPoint APIs

### Auth APIs

/\*\*

- @route POST /auth/loginUser
- @description Log in with email and password
- @body {email, password}
- @access public
  \*/

### User APIs

/\*\*

- @route POST /users/customer
- @description Register new (user) customer
- @body {name, email, password}
- @access public
  \*/

/\*\*

- @route POST /users/seller
- @description Register new admin
- @body {name, email, password}
- @access public
  \*/

/\*\*

- @route GET /users/me
- @description Get current user info
- @body
- @access Login required
  \*/

/\*\*

- @route GET /users/:id
- @description Get a user profile
- @access Login required
  \*/

/\*\*

- @route PUT /users/admin/:id
- @description Update admin profile
- @body {name, avataUrl, address}
- @access Login required
  \*/

### Product APIs

/\*\*

- @route POST /products
- @description Create a new products
- @body { name, image, description, types:[ Fruit, Vetgetable ], price, unit, amount }
- @access Admin Login required
  \*/

/\*\*

- @route GET /products?page=1&limit=10
- @description Get all products with pagination
- @body
- @access public
  \*/

/\*\*

- @route GET /products/:id
- @description Get a product
- @body
- @access public
  \*/

/\*\*

- @route GET /products/detail/:id
- @description Get a product
- @body
- @access public
  \*/

/\*\*

- @route GET /products/:id?page=1&limit=10
- @description Get products with pagination
- @body
- @access public
  \*/

/\*\*

- @route PUT /products
- @description Update a new products
- @body {name, image, description, types:[ Fruit, Vetgetable ], price, unit, amount}
- @access Admin Login required
  \*/

/\*\*

- @route DELETE /products/:id
- @description Delete a product
- @body
- @access Login required
  \*/

### Cart APIs

/\*\*

- @route POST /carts
- @description Create a new cart
- @body { productId:Types.ObjectId, customerId:Types.ObjectId, amount }
- @access Seller Login required
  \*/

/\*\*

- @route GET /cart?page=1&limit=10&
- @description Get cart with pagination
- @body
- @access Login require
  \*/

/\*\*

- @route PUT /carts
- @description Update a new cart
- @body {amount}
- @access Admin Login required
  \*/

/\*\*

- @route DELETE /carts/:id
- @description Delete a cartProduct
- @body
- @access Login required
  \*/

### Orders APIs

/\*\*

- @route POST /oders
- @description Create a new Oders
- @body { productName, userName, amount }
- @access Login required
  \*/

/\*\*

- @route GET /oders?page=1&limit=10
- @description Get oders with pagination
- @body
- @access login Require
  \*/

/\*\*

- @route GET /oders/admin?page=1&limit=10
- @description Get oders with pagination
- @access Login Require
  \*/

/\*\*

- @route GET /oders/:id
- @description Get a oders
- @access Login required
  \*/

/\*\*

- @route PUT /oders
- @description Update a new oders
- @body {status}
- @access Admin Login required
  \*/

/\*\*

- @route DELETE /oders/:id
- @description Delete a oder
- @access Login required

## Rlational Diagram

![](https://i.imgur.com/5DbHT3X.png)
