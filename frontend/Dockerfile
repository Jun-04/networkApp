FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Viteのデフォルトポートは5173なので、--host 0.0.0.0 を付けて起動します
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]