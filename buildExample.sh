cd example
yarn install
yarn build:ghpages
mkdir -p ../docs/example
cp -r ./build/* ../docs/example

