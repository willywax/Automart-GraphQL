# Automart-Api
[![Coverage Status](https://coveralls.io/repos/github/willywax/Automart-Api/badge.svg?branch=develop)](https://coveralls.io/github/willywax/Automart-Api?branch=develop)
[![Build Status](https://travis-ci.org/willywax/Automart-Api.svg?branch=develop)](https://travis-ci.org/willywax/Automart-Api)
[![Maintainability](https://api.codeclimate.com/v1/badges/361a54a98974e89478c0/maintainability)](https://codeclimate.com/github/willywax/Automart-Api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/361a54a98974e89478c0/test_coverage)](https://codeclimate.com/github/willywax/Automart-Api/test_coverage)


# Automart 

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With
Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers

---
## Project Planning and Stories 
The project and user features where created using a tool called Pivotal Tracker and the dashboard can be accessed via [Automart Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2346911)

## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
---
## Install

    $ git clone https://github.com/willywax/Automart-Api
    $ cd Automart-Api
    $ npm install --save

## Intergration and Configuration
The Application has no special configuration needed. App has been intergrated with 

* [Travis](https://travis-ci.org/) For project build 
* [Coveralls](https://coveralls.io/) For Test Coverage 
* [CodeClimate](https://codeclimate.com/) To review Code Quality
* [Pivotal Tracker](https://www.pivotaltracker.com/) For Project Planning




## Running the project
    `nodemon index.js`  or `npm start `

## Running the Tests   
    `npm run test`  or  `npm run coverage`  to get Coverage report 

## Hosting of API End Points
The API Endpoints have been successfully hosted on Heroku and can be accessed 
using the link below. [Automart API](https://willywax-automart-api.herokuapp.com/)

## Detailed Documentation 
The detailed documentation showing every route, input parameters and resulted output
has been hosted on PostMan API Documenter. And can be accessed using 
[Automart-API Documentation](https://documenter.getpostman.com/view/7765769/S1Zw6pkv?version=latest#09889aab-f24f-4923-b0ac-c96bece21b9c)

## Endpoints to be Done 

User (seller) can post a car sale advertisement.
- [x] User (buyer) can make a purchase order.
- [x] User (buyer) can update the price of his/her purchase order.
- [x] User (seller) can mark his/her posted AD as sold.
- [x] User (seller) can update the price of his/her posted AD.
- [x] User can view a specific car.
- [x] User can view all unsold cars.
- [x] User can view all unsold cars within a price range.
- [x] Admin can delete a posted AD record.
- [x] Admin can view all posted ads whether sold or unsold.

Optional Features
- [ ] User can reset password.
- [ ] User can add multiple pictures to a posted ad.
- [x] User can view all cars of a specific body type.
- [x] User can view all used unsold cars.
- [x] User can view all new unsold cars.
- [ ] User can ​ flag/report​ a posted AD as fraudulent.
- [x] User can view all unsold cards of a specific make (manufacturer)

## Detailed API End Points 
Detailed Endpoints can are hosted in POST MAN and can be accessed via 
[PostMan AutoMart-API](https://documenter.getpostman.com/view/7765769/S1Zw6pkv?version=latest)


