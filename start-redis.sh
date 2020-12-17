#!/bin/sh

# --publish is for wiola that reuses our network
docker run \
	--rm -d \
	--name=redis \
	--publish 8080:80 \
	redis
