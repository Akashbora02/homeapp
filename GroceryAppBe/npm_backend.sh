apt install npm -y
npm install
npm init -y
npm install express mongoose cors
npm install dotenv
npm install -g pm2
pm2 start server.js --name grocery-backend
pm2 save
pm2 startup