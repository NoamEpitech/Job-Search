FROM node:14-alpine

WORKDIR /app

COPY frontend/* ./
COPY frontend/public/* ./public/
COPY frontend/src/* ./src/

RUN npm install

# Copy the entire project to the working directory
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
