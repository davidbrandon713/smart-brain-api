# docker build -t container .                       -- build container "container"
# docker run -it (-d) (-p 3000:3000) container      -- run container (-d to run continuously) (-p to bind container port to host) (-it required)
# docker stop cd8d8b7eaf10                          -- use the hash to stop container
# docker ps                                         -- from source directory, lists active containers
#
# docker-compose build
# docker-compose up ( --build )                     -- runs all services (build only required first time)
# docker-compose down                               -- stops all services
# docker-compose run servicename
# docker-compose exec redis redis-cli               -- connects to redis db within smart-brain-api repo

FROM node:18.13.0

WORKDIR /Projects/JrToSrDev/smart-brain-api

COPY ./ ./

RUN npm install -e POSTGRES_PASSWORD=pass

CMD ["/bin/bash"]