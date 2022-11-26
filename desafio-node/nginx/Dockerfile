FROM nginx:latest

COPY html /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/sites-available

RUN mkdir /var/www/html -p && touch /var/www/html/index.js

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]