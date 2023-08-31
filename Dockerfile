FROM python:3.8-slim as backend

WORKDIR /app

COPY backend /app
COPY backend/requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]

FROM node:14-alpine as frontend

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./

RUN npm install --silent
# RUN npm install react-script@4.0.0 -g --silent

COPY frontend /app
EXPOSE 3000

CMD ["npm", "start"]