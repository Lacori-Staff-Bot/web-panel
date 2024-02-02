# Frontend Lacori/Staff bot

# Установка

## Требуемые компоненты

### Ubuntu Sever 22.04+
```
sudo apt-get update
sudo apt-get upgrade
```
Установить последние обновления системы

### Node.JS 20.x+

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

### Nginx

`sudo apt-get install nginx` - Установка Nginx

## Настройка

1. Скопировать github репозиториц на сервера

2. Скачать зависимости репозитория

`npm install` - Скачивание зависимостей

2. Настроить конфиг `src/assets/config.js`

```js
export const CLIENT_ID = "YORT_BOT_CLIENT_ID";
export const MAIN_REDIRECT_URI = "YOUR_FRONT_END_URL"; //http://example.com
export const API_URL = "YOUR_API_URL"; // http://example.com/api
export const BOT_NAME = "Lacori/Staff Bot";
```
Шаблон настроек

3. Скомпилировать Front-End

`npm run build` - Компиляция Front-End

4. Скопировать компилированную Front-End часть в `/var/www/web-panel`

`sudo mkdir /var/www/web-panel` - Создание папки web-panel

`sudo cp -r buid/* /var/www/web-panel` - Копирование компилированной Front-End части

5. Настроить nginx сайт `/etc/nginx/sites-enabled/default`

```nginx
server {
        listen 80;
        server_name YOUR_FRONT_END_URL;

        location / {
                index index.html;
                root /var/www/web-panel;
                try_files $uri /index.html;
        }

        location /api {
                rewrite ^/api(/.*)$ $1 break;
                proxy_pass http://localhost:3001;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        #Переключение на https, чтобы переключится на https протокол
        #раскоментируйте настройте строчки ниже

        #listen 443 ssl;
        #ssl_certificate PATH_TO_SSL_CERTIFICATE;
        #ssl_certificate_key PATH_TO_SSL_CERTIFICATE_KEY;

        #if ($sheme != "https") {
        #       rewrite ^ https://$host$uri permanent;
        #}
}
```
Шаблон настроек

6. Презапустить nginx для принятия настроек

`sudo systemctl restart nginx.service` - Презапуск nginx