FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN npm install &&  npm run build && npm uninstall -g @sherlog/cli && npm install -g ./
CMD [ "./tests/run.sh"]
