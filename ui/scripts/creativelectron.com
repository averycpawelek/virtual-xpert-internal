server {
    listen      80;
    server_name creativelectron.com www.creativelectron.com;

    charset utf-8;
    root    /var/www/creativelectron/ui/dist;    
    index   index.html index.htm;

    # Always serve index.html for any request
    location / {
        root /var/www/creativelectron/ui/dist;
        try_files $uri /index.html;
    }
    
    error_log  /var/www/creativelectron/logs/nginx/vue-app-error.log;
    access_log /var/www/creativelectron/logs/nginx/vue-app-access.log;
}