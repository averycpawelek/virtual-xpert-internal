#!/bin/bash

sudo su

cd /var/www/creativelectron/api/

echo "Install requirements..."
. /var/www/creativelectron/api/env/bin/activate

pip install -r /var/www/creativelectron/api/requirements.txt
chown -R www-data:www-data /var/www/creativelectron/

echo "Main service reload..."
service creativelectron stop
cp -f /var/www/creativelectron/api/scripts/creativelectron.service /etc/systemd/system/
systemctl daemon-reload
service creativelectron restart

echo "Nginx reload..."
service nginx restart

# echo "Celery reload..."
# cp -f /var/www/creativelectron/api/scripts/celery-worker.conf /etc/supervisor/conf.d/
# supervisorctl reload
