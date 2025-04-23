## Author Details
* Author: Lim Tong En
* Created On: 22/4/2025
* Last Updated On: 23/4/2025

## About

This project is a full-stack web application developed as part of a technical assessment by CapBay. The application is build using Laravel framework for backend and React for frontend.

Project background: The system is designed to streamline the vehicles sales process for sales agents from CapBay Auto Sdn Bhd, on their latest AI cat model, Vroom. It will allow the customers to register and book an appointment for the test drive of this new vehicle. Sales agent are also allowed to view the list of registration along with the customer details such as

- name.
- car purchase status.
- amount of down payment paid.
- amount of down payment.
- amount of loan.
- registration date
- etc.

This informations are important as it is requuired for the sales agenet to evaluate whether the customer are entitled for a 15% discount on their down payment amount, where the top 10 customers who have purchased the car and paid at least 10% of the down payment will be eligible for the discount.


## Steps to run the application

- Clone the repository and navigate to the project folder:

`git clone https://github.com/tongenLim0827/capbayVroomProject.git`

`cd capbayVroom`

- Setting up laravel environment: Install PHP dependencies

`composer install`

- Configure the env file

`cp .env.example .env`

`php artisan key:generate`


```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=database_username  #most likely is root
DB_PASSWORD=database_password
```


-  Connect the project to the database: Create a database at Dbeaver (or any of your preferred database GUI) and make sure the following settings are configured in order establish the connection. Select MySQL as the database
```
Host: 127.0.0.1
Port Number: 3306
Database: database_name
Username: database_username
Password: database_password
```
- Run migrations

`php artisan migrate`

- Install frontend dependencies

`npm install`

- Start the backend and frontend server

`php artisan serve`

`npm run dev`

Now the application is served at <Link>http://127.0.0.1:8000</Link>

## Using the application
To distinguish the UI view for admin (Sales Agent) and guest (customer), we have to manually change the value for isSalesAgent at the database where 1 represents the current user is a sales agent and 0 represents normal customer.

For a Sales Agent, they are able to view the list of registration for the CapBay Vroom test drive and also evaluate whether the customer is eligible for promotion. If the customer is eligible, the sales agent will modify the down payment amount that needs to be paid by the customer

For a customer, they can book an appointment for the test drive and view their booking history later. They can also track their appointment status to see whether it is being processed by the sales agent.
