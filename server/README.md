# PYTHON SERVER CREATED USING STARLETTE AND UVICORN

# RUNNING THE APP LOCALLY.

- For seeding the database, run python seed.py or python3 seed.py
- Installing all the dependencies using the command 'pip3 install -r requirements.txt'
- Make sure to install postgres database on your local machine and create vector_assessment database.
- Create an env file with DATABASE_URL to your postgres database.
- Run the server using the command 'python3 server.py'

# DOCKERIZING THE APPLICATION.
# clean out your existing containers and volumes if you want to start fresh
- docker rm $(docker ps -a -f status=exited -q); docker volume prune -f
- docker-compose up --build # --build will rebuild the images, if you want to start in the background add -d
- docker-compose down # stop the containers