#!/bin/sh

exec docker run \
    --rm \
    -ti \
    --name=wiola \
    --net container:redis \
    --volume $PWD/nginx.conf:/usr/local/openresty/nginx/conf/nginx.conf \
    wiola $@
