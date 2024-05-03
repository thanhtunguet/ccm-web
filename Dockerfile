FROM nginx:1.25-alpine
WORKDIR /var/www/html/
COPY nginx/ /etc/nginx/conf.d/
COPY  dist/ /var/www/html/
