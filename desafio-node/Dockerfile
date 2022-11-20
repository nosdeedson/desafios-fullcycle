FROM nginx

WORKDIR /app

COPY ./start.sh /start.sh
COPY ./app/src /app/src
COPY ./app/db /app/db
COPY ./package.json /app

COPY ./default.conf /etc/nginx/conf.d/

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash

RUN apt-get install -y nodejs

RUN npm install

EXPOSE 80

CMD ["/start.sh"]
