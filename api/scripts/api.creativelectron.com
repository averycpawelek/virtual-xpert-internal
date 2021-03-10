server {
    listen 80;
    server_name api.creativelectron.com www.api.creativelectron.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /var/www/creativelectron/api;
        autoindex off;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/creativelectron/api/creativelectron.sock;
    }

    access_log /var/www/creativelectron/logs/nginx/access.log;
    error_log /var/www/creativelectron/logs/nginx/error.log;
}