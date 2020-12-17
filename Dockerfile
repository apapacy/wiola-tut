# NOTE: This is a really quick & dirty version
FROM openresty/openresty:1.13.6.2-0-alpine-fat

RUN apk add --no-cache cmake openssl-dev git
RUN /usr/local/openresty/luajit/bin/luarocks install wiola 0.9.1-2

CMD ["/usr/local/openresty/bin/openresty"]

