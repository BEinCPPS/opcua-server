FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json /usr/src/app/
ADD . /usr/src/app/

EXPOSE 26543 7001

# Execute app
CMD [ "npm", "start" ]
