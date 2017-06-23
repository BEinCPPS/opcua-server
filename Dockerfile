FROM node:boron
MAINTAINER Antonio Scatoloni (antonio.scatoloni@eng.it)

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json /usr/src/app/
ADD . /usr/src/app/

EXPOSE 26543 7001

# Execute app
CMD [ "npm", "start" ]
