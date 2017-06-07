FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# COPY package.json /usr/src/app/
ADD package.json ./
ADD ./node_modules ./
RUN npm install

# Bundle app source
COPY . /usr/src/app

VOLUME /usr/src/app

EXPOSE 26543 7001

# Execute app
CMD [ "npm", "start" ]
