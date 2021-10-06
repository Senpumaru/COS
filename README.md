
# COS
COS (Centralized Oncology Services)

#### Docker Compose
### Development:
Run <br />
docker-compose --project-directory . --file ./Docker/Development/Docker-compose.yml --project-name cos-dev up --build
## Containers:
Backend: <br />
./manage.py collectstatic --no-input <br />
./manage.py makemigrations <br />
./manage.py migrate <br />


### Testing:
Run <br />
docker-compose --project-directory . --file ./Docker/Testing/Docker-compose.yml --project-name cos-test up --build
## Containers:
Backend: <br />
./manage.py collectstatic --no-input <br />
./manage.py makemigrations <br />
./manage.py migrate <br />
