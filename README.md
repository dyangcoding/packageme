# Getting Started

###### **Introduction**

[Packageme](https://packageme.netlify.app/) aims to help local community to find delivered packages more easily.

## Getting Started

### Prerequisites

make sure you have Node.js installed, otherwise head to [Node.js official web site](https://nodejs.org/en/).

### Installing

First, check out the source code:

```bash
git clone https://github.com/dyangcoding/packageme.git
```

Then install all dependencies in the project's root folder:

``` bash
# move into the project folder
cd packageme

# install dependencies, this may take a moment
npm install
```

## Setup Environment Variables

create a .env file at the project root folder which contains following variables:

```
REACT_APP_CONTACT_EMAIL=YOUR_CONTACT_EMAIL
REACT_APP_REALM_APP_ID=YOUR_REALM_APP_ID
REACT_APP_SITE_NAME=YOUR_SITE_NAME
REACT_APP_TOTP_BASE_URL=YOUR_TOTP_BASE_URL
REACT_APP_TOTP_BASE_URL=YOUR_TOTP_SECRET
```

Note that variable name must start with 'REACT_APP_', this exposes the variables to React Application.
Enviroment Variables that are supposed to be kept secret should not be pushed to the repository. 

## Backend Simplified

Packageme requires at the moment basic CRUD Actions. One could set up a backend server providing this service accordingly, 
Packageme utilises [MongoDB Realm](https://docs.mongodb.com/realm/cloud) as a backend service instead.
MongoDB provides real-time data updating to all connected clients using [Change Streams](https://docs.mongodb.com/manual/changeStreams/).

The REACT_APP_REALM_APP_ID is generated once the project setup is accomplished at MongoDB Realm. More under [Find Project ID](https://docs.mongodb.com/realm/get-started/find-your-project-or-app-id/).

## Authentification using Time-Based One-Time Password

Neighbors in the local community could upload package's informations which might contain personal informations that one does not want to be public exposed.
In order to protect user privacy Packageme needs some sort of authentication. The traditional Email/Password would be a overkill, 
instead A [Time-Based One-Time Password (TOTP)](https://en.wikipedia.org/wiki/Time-based_One-Time_Password) is implemented.

One might have noticed that Packageme is deployed at the [Netlify](https://www.netlify.com). Beside easy deployment provides Netlify also [serverless function](https://www.netlify.com/products/functions/) which is ideal for the purpose of verifying TOTP that user supplied.

The REACT_APP_TOTP_BASE_URL and REACT_APP_TOTP_BASE_URL are used for the TOTP. More about the Implementation under [Two Factor Authentication with Node and React](https://medium.com/onfrontiers-engineering/two-factor-authentication-flow-with-node-and-react-7cbdf249f13).

## User Feedback

Packageme takes advantage of [Netlify forms](https://docs.netlify.com/forms/setup/) to collect user feedbacks.

## Local development and Testing

You are good to go if the project is properly set up according [Netlify Dev](https://docs.netlify.com/cli/get-started/?_gl=1%2ad2vv6m%2a_gcl_aw%2aR0NMLjE2MzgwMDY5NzQuQ2owS0NRaUF5NGVOQmhDYUFSSXNBRkRWdEkxbThta0thRy1WSWlnWFFTYWR0bjdDSmE4UzhIbU0zaVJQOWl1Rl9fNnFuRlRWZGE0YTRaWWFBaC1pRUFMd193Y0I.&_ga=2.19472120.1593523262.1638004948-1792198658.1638004948&_gac=1.187053914.1638006974.Cj0KCQiAy4eNBhCaARIsAFDVtI1m8mkKaG-VIigXQSadtn7CJa8S8HmM3iRP9iuF__6qnFTVda4a4ZYaAh-iEALw_wcB#netlify-dev). 

Run the following command to start local server:

``` bash
# serve with hot reload at localhost:8888
netlify dev
```

Now Packageme is listening on http://localhost:8888

## Build With
* [React.js](https://reactjs.org/)
* [React Redux](https://react-redux.js.org/)
* [MongoDB Realm](https://www.mongodb.com/realm)
* [Tailwindcss](https://tailwindcss.com/)


## Deployment
* [Netlify](https://www.netlify.com)


## License

Do whatever you want with the source code.
