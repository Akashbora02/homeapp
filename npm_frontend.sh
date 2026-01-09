npm install
npm run build
pm2 list
pm2 serve build/ 3002 --name "homeapp-frontend" --spa