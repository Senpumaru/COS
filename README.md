# COS
COS (Centralized Oncology Services) - Docker Compose: Testing

## Development:
Run <br />
docker-compose --project-directory . --file ./Docker/Development/Docker-compose.yml --project-name cos-dev up --build
### Containers:
Backend: <br />
./manage.py collecsttatic --no-input <br />
./manage.py makemigrations <br />
./manage.py migrate <br />


## Testing:
Run <br />
docker-compose --project-directory . --file ./Docker/Testing/Docker-compose.yml --project-name cos-test up --build
### Containers:
Backend: <br />
./manage.py collecstatic --no-input <br />
./manage.py makemigrations <br />
./manage.py migrate <br />
