# Welcome to PartyHopper
### When you can't seem to find the Party, PartyHopper is there for you
---


___

### Visit the live site:  https://partyhopper.herokuapp.com/
___

### Created By Tim Reinhardt

Github: https://github.com/tjreinhardt

LinkedIn: https://www.linkedin.com/in/tim-reinhardt-55716b146/

___


### Technologies Used:

  * Python
  * Javascript
  * Redux
  * Flask
  * SqlAlchemy
  * Sqlite3
  * Postgres
  * React-Spring
  * React-Spring-Carousel
  * Heroku
  * Docker
  * React F/A Icons
  * CSS
  * HTML

---
### Learn More About This Project

  * [DB Schema](https://github.com/tjreinhardt/PartyHopper/wiki/Database-Schema)
  * [MVP Features](https://github.com/tjreinhardt/PartyHopper/wiki/MVP-Features-List)
  * [User Stories](https://github.com/tjreinhardt/PartyHopper/wiki/User-Stories)
  * [Wireframes](https://github.com/tjreinhardt/PartyHopper/wiki/Wireframe)
  
  
___
## Login Page

___
## Signup Page

___
## Home Page
![partyhopper-homepage](https://user-images.githubusercontent.com/95321368/189557649-faa81a6b-b796-4600-a690-cf89b01873a0.png)

___
## Create Event / Edit Event
![create-event](https://user-images.githubusercontent.com/95321368/189557779-44c513ca-d057-42f0-9ac3-0acc00f2f2b5.png)
![edit-event](https://user-images.githubusercontent.com/95321368/189557815-60ed68d3-bf6b-4465-b886-d65efeb96f31.png)

___
## Create Review / Edit Review

___
## Event Details

___

### How To Use This Project Repo Locally:

1. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

2. Create a **.env** file based on the **.envexample** file
3. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

4. Start pipenv virtual environment, migrate your database, seed your database, then run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
