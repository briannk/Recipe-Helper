# Recipe-Helper
A recipe web app that allows the creation and sharing of recipes.

## Installation
Clone the repository with `git clone https://github.com/briannk/Recipe-Helper.git` and install all packages with `npm install`.

In order to use caching, you must also have a Redis instance hosted either locally or another cloud platform. The guide below will demonstrate the prior method.

### Local Redis DB
NOTE: Requires a linux distribution of your choice

Install redis using `sudo apt-get install redis` and spin up the server using `redis-server`.

In the event you use a Windows OS, you can utilize [a linux subsystem](https://docs.microsoft.com/en-us/windows/wsl/install) to have *bash* available or another cli depending on the distro.

## Running the App
### Frontend
From the frontend folder, *recipe-helper-app*, you can either run the web app locally via `npm start` or build and deploy a production build with 
```
npm run build
npm install -g serve
serve -s build
```
### Backend
To get the backend running, you will need a [MongoDB Atlas cluster](https://www.mongodb.com/atlas/database) available to store the recipes and a database user/password combination to set as environment variables. Store the .env file in the root of the backend folder and update the variable to reflect the appropriate cluster and database to access.

You will also need [an Edamam API key](https://developer.edamam.com/edamam-recipe-api) and password to access the external recipes if you so choose to use them.
Once you have set both environment variables, you can spin up the server locally with `npm start`.


## Attributions
[Edamam Recipe API](https://developer.edamam.com/edamam-recipe-api)
