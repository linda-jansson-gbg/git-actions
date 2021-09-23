# Dockerfile säger vad som ska göras när man vill bygga en docker image
# Speca vilken kontex ska användas som mall. Node, PHP, Linux, .Net eller  
# vad man behöver för att köra sin app.
# Vilken "base image" vill vi använda för att köra vår app? Web-appar körs
# alltid i node
# FROM node:lts-alpine denna är minimalistisk. Den har exempelvis ingen python
FROM node:10

# Sedan behöver vi en webserver för att köra igång
# Run kör ett kommando i din docker image
RUN npm install -g http-server

# WORKDIR /the/workdir/path anger vilken mapp vi ska kopiera våra filer 
# till i vår docker image. Och vi ställer oss i den appen
# Skapar upp en mapp som kallas /app
WORKDIR /app

# Kopierar package och lock.json till mappen vi står i i Docker
COPY package*.json ./

# Kör en installation av det som finns package.json
RUN npm install

# Kopiera över resten av filerna till vår app-mapp i vår docker image
COPY . .

# Sedan bygger vi vår vue app i vår docker image
RUN npm run build

# Sedan säger vi vilken port som ska vara öppen för vår container
EXPOSE 8080

# Kör igång vår http-server och servrar vår dist-mapp
CMD [ "http-server", "dist" ]

### Sedan för att bygga din image kör: docker build -t namn .
### Sedan: docker run -d -p 8080:8080 namn