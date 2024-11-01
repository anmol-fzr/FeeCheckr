FROM oven/bun:1.1.33

WORKDIR . /app
COPY package*.json .
RUN bun i 
COPY . .
EXPOSE 5173
CMD ["bun" , "run", "dev"]
