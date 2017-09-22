#!/bin/sh
sftp develop@192.168.50.100<<EOF
cd /opt/tomcat-meterms-st/webapps
lcd dist/dist
rm index.html
rm static/*/*
put -r index.html
put -r static/css/* static/css
put -r static/js/* static/js
put -r static/fonts/* static/fonts
put -r static/img/* static/img
quit  
EOF 