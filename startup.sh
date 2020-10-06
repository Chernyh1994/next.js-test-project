#!/bin/bash

if [ -d "./node_modules" ]
then
    echo "exists..."
else
  npm install
fi

# Variables.
ENV_FILE=$PWD/.env

# A function that checks if data has been entered.
function checkEmpty() {
  while read -r -p "$1" ITEM; do
    ITEM=${ITEM}
    if [[ "$ITEM" =~ ^()$ ]]; then
      continue
    else
      echo "$ITEM"
      break
    fi
  done
}

# A function that checks if words have been entered yes or no
function checkYesNo() {
  while read -r -p "$1" ITEM; do
    ITEM=${ITEM}
    if [[ "$ITEM" =~ ^(yes|y|no|n)$ ]]; then
      echo "$ITEM"
      break
    else
      continue
    fi
  done
}

GENERATE=$(checkEmpty "Do you have generate .env file? [y/N]: ")

if [[ "$GENERATE" =~ ^(yes|y)$ ]]; then
  if [ -f "$ENV_FILE" ]; then
    docker-compose up --build
  else
    echo "We haven't found your .env file. Import .env file by the following pass $PWD and restart a script."
  fi
elif [[ "$GENERATE" =~ ^(no|n)$ ]]; then

  DEPLOY=$(checkYesNo "You deploy the project locally? [y/N] $(tput setaf 1)(required)$(tput sgr0): ")

  if [[ "$DEPLOY" =~ ^(yes|y)$ ]]; then
    NODE_ENV='local'
    PORT=$(checkEmpty "Enter local port
      > for example: $(tput setaf 2)3000$(tput sgr0)
      > $(tput setaf 1)(required)$(tput sgr0): ")
  elif [[ "$DEPLOY" =~ ^(no|n)$ ]]; then
    NODE_ENV='prod'
  fi

  MONGO_INITDB_ROOT_USERNAME=$(checkEmpty "Enter mongodb user name
    > for example: $(tput setaf 2)user$(tput sgr0)
    > $(tput setaf 1)(required)$(tput sgr0): ")

  MONGO_INITDB_ROOT_PASSWORD=$(checkEmpty "Enter mongodb password
    > for example: $(tput setaf 2)root$(tput sgr0)
    > $(tput setaf 1)(required)$(tput sgr0): ")

  cd $PWD && rm -rf .env && touch .env

  echo "NODE_ENV=$NODE_ENV" >> ./.env
  echo "PORT=$PORT" >> ./.env
  echo "MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME" >> ./.env
  echo "MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD" >> ./.env

  docker-compose up --build

else
  exit 0
fi