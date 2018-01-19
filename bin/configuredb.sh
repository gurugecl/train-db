#!/bin/bash

export PGPASSWORD='train_password'

database="traindb"

echo "Configuring database: $database"

dropdb -U train_user traindb
createdb -U train_user traindb

psql -U train_user traindb < ./bin/sql/train.sql

echo "$database configured"


