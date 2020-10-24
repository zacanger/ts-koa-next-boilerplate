FROM node:14-alpine
WORKDIR /app
COPY --chown=node:node . .
RUN npm ci && \
    npm run build && \
    rm -rf node_modules && \
    npm ci --production --no-optional
USER node
ENV NODE_ENV=production \
    TERM=linux \
    TERMINFO=/etc/terminfo \
    PORT=3000
EXPOSE 3000
CMD ["npm", "run", "prod"]
