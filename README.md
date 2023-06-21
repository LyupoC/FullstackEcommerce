# Ecommerce Website

live version of progress:

plan:

<img src="readme_images/releaseTimeline.png?raw=true" width="800" alt="springBoot logo" />

A fullstack Ecommerce website (still under construction), current features:
  * Spring Boot JPA for products list, product categories and orders
  * Spring REST
  * Angular Front end
  * PostgreSQL

<img src="readme_images/angularLogo.png?raw=true" width="60" alt="angular logo" />&emsp;
&emsp;**+**&emsp;<img src="readme_images/springBoot.png?raw=true" width="90" alt="springBoot logo" />
&emsp;**+**<img src="readme_images/postgreSqlLogo.png" width="70" alt="postgreSql logo" />

## Interfaces
|| Web | Mobile |
|:--|:-----:|-----:|
|List|<img src="readme_images/interfaces/index.png" width="300" alt="" />  |  <img src="readme_images/listList_mobile.png" width="210" alt="" />|
|New List|<img src="readme_images/interfaces/shop.png" width=210" alt="" />  | <img src="readme_images/interfaces/shop_mobile.png" width="210" alt="" /> |
|Update List| <img src="readme_images/interfaces/checkout.png" width="310" alt="" />  |  <img src="readme_images/interfaces/checkout_mobile.png" width="210" alt="" /> |
|Task View|<img src="readme_images/interfaces/cart_details.png" width="310" alt="" style="min-width:300px;" />|<img src="readme_images/interfaces/cart_details_mobile.png" width="210" alt="" />|

## Create Database Tables

Run the database script from sql_scripts/ to generate the postgreSQL tables for the application and add data


## Run Back end

using maven and spring boot:

```bash
mvn spring-boot:run
```
or generating manually the jar by building the project with mave3n:

```bash
mvn clean install
```

and then executing the jar from the home project directory

```bash
java -jar .\target\TaskManager-0.0.1-SNAPSHOT.jar
```

or using Docker:

```bash
docker build -t ecommerceBackImg .
docker run --name ecom ecommerceBackImg
```

## Run Front end

- install angular and npm in the front-end directory
- install dependencies:
```bash
bootstrap@4.4.1
@angular/material@14
```
The app will be run at localhost:4200
navigate to front-end root directory and type.

```bash
ng serve
```
