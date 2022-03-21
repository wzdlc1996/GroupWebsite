#!/bin/bash

cd client
npm run build

mv -f ./build ../release/build

cd ../release
go build servReact.go