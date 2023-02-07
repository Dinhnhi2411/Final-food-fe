# Food Store - Mini Food

## User Stories

### Background

FoodStore is an online sales application. FoodStore specializes in providing fresh fruits and vegetables to serve the needs of customers.
With FoodStore, consumers can view and buy goods directly on the application without having to go far to buy, and also save customers' time.
FoodStore will be a place that fully meets, diverse in products, quality and reasonable prices.

### Authentication

- As a user, i can sign in with my email and pasword.
- As a user, i can register for a new account, email, password.
- As a user, i can stay signed in with refreshing page.

### User

- As a user and as is a customer, I can see the user's profile.
- As a user and as is a customer, I can update my profile.
- As a user and as of a seller , I can see my profile.
- As a user and as is a seller, I can update my profile.

### Product

- As a use and as is a customer, I can see a list of all products.
- As a use and as is a customer, I can search according to the product name
- As a user and as of a customer, I can see the details of a product.
- A a user and as of a customer, I can write review for a product.
- As a user and as of a seller , I can see the list of products I'm selling.
- As a user and as of a seller , I can add new products.
- As a user and as of a seller , I can update the information of a product I'm selling
- As a user and as of a seller , I can delete my product.

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

### DashBoard

- As a user and as of a seller, I can see detail dashboard as total product, total order, total user, revenue in month.
- As a user and as of a seller, I can see latest orders, latest products.
- As a user and as of a seller, I can see all product, edit product,delete product search according product name..
- As a user and as of a seller, I can see all user, delete user and search according user name.
- As a user and as of a seller, I can see all order, update status order and filter according status order.

## EndPoint APIs

### Auth APIs

/\*\*

- @route POST /auth/login
- @description Log in with email and password
- @body {email, password}
- @access public
  \*/

  /\*\*

- @route POST /auth/google
- @description Log in with google
- @body {accessToken}
- @access public
  \*/

  /\*\*

- @route POST /auth/facebook
- @description Log in with facebook
- @body {accessToken}
- @access public
  \*/

### User APIs

#### Customer

/\*\*

- @route POST /users/customer
- @description Register new (user) customer
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
@route PUT /users/customer/:id
@description Update customer profile
@body {name, avataUrl, address}
@access Login required
\*/

#### Seller

/\*\*
@route GET /users
@description Get all users
@body
@access Login required
\*/

/\*\*
@route DELETE /users/delete/:id
@description Delete user
@body
@access Login requried
\*/

/\*\*
@route PUT /users/customer/:id
@description Update customer profile
@body {name, avataUrl, address}
@access Login required
\*/

### Product APIs

#### Public

/\*\*

- @route GET /products?page=1&limit=10
- @description Get all products with pagination
- @body
- @access public
  \*/

/\*\*

- @route GET /products/productsTopSelling?page=1&limit=10&name=`$productName`
- @description Get products top selling with pagination
- @access public
  \*/

/\*\*

- @route GET /products/productsNew?page=1&limit=10&name=`$productName`
- @description Get products new with pagination
- @access public
  \*/

/\*\*

- @route GET /products/productsDiscount?page=1&limit=10&name=`$productName`
- @description Get products top selling with pagination
- @access public \*

/\*\*

- @route GET /products/:id
- @description Get a product
- @body
- @access public \*

#### Seller

/\*\*

- @route GET /products?page=1&limit=10
- @description Get all products with pagination
- @body
- @access Login required
  \*/

/\*\*

- @route GET /products/:id
- @description Get a product
- @body
- @access Login required
  \*/

/\*\*

- @route POST /products
- @description Create a new products
- @body { name, image, description, types:[ Fruit, Vetgetable ], price, unit, amount }
- @access Admin Login required
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

- @route POST /carts/me
- @description Create a new cart
- @body { productId:Types.ObjectId, customerId:Types.ObjectId, amount }
- @access Seller Login required
  \*/

/\*\*

- @route GET /carts/me
- @description Get cart
- @body
- @access Login require
  \*/

/\*\*

- @route PUT /carts/me/:id
- @description Update a cart
- @body {amount}
- @access Admin Login required
  \*/

/\*\*

- @route DELETE /carts/:id
- @description Delete a cart
- @body
- @access Login required
  \*/

### Orders APIs

#### Customer

/\*\*

- @route POST /oders/me
- @description Create a new Oders
- @body { name, addressShip, phone, products, priceShip, total }
- @access Login required
  \*/

/\*\*

- @route GET /oders/me
- @description Get oders me
- @body
- @access Login required
  \*/

/\*\*

- @route GET /oders/me/:id
- @description Get oders by id
- @access Login required
  \*/

#### Seller

/\*\*

- @route GET /oders
- @description Get all oders
- @access Login required
  \*/

/\*\*

- @route GET /oders/me/:id
- @description Get a oder by id
- @access Login required
  \*/

/\*\*

- @route PUT /oders
- @description Update a oder
- @body {status}
- @access Admin Login required
  \*/

/\*\*

- @route DELETE /oders/:id
- @description Delete a oder
- @access Login required

## Rlational Diagram

![](https://i.imgur.com/5DbHT3X.png)

## Link Demo ![](https://yuen-final-food.netlify.app)

## View app display

![7](https://user-images.githubusercontent.com/109861294/217181122-2c057ebc-40ba-4515-9594-b348222a29f9.png)

## Vew login display

![1](https://user-images.githubusercontent.com/109861294/217179264-e4b7e64d-f64a-4dcc-a46a-5ffc868582c2.png)

## View products and information product display

![6](https://user-images.githubusercontent.com/109861294/217181718-b6a1027e-ce60-46e7-8ec2-11fc25a36791.png)

## View cart and order display

![5](https://user-images.githubusercontent.com/109861294/217182153-2da31619-69e6-43b9-8235-d8146890ca2a.png)

![4](https://user-images.githubusercontent.com/109861294/217182291-763b9d85-a012-467d-91c0-ac4322bc6220.png)
