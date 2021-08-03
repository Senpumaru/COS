# COS
COS (Centralized Oncology Services) - Docker Compose: Testing

## Development Run:
docker-compose --project-directory . --file ./Docker/Development/Docker-compose.yml --project-name cos-dev up --build

## Testing Run:
docker-compose --project-directory . --file ./Docker/Testing/Docker-compose.yml --project-name cos-test up --build
