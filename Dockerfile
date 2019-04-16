FROM node:10.15.3-alpine as chat001
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=chat001 /app/build /usr/share/nginx/html
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all