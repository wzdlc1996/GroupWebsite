#!/bin/bash

cd client
npm run build

rm -rf ../release/build
mv -f ./build ../release/build

cd ../release
env GOOS=windows GOARCH=amd64 go build servReact.go
rm win.tar

cd ../server
env GOOS=windows GOARCH=amd64 go build main.go

cd ..
tar -cf ./release/win.tar ./server/main.exe ./db ./release/build

rm ./server/main.exe
rm ./release/servReact.exe