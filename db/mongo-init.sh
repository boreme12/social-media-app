#!/bin/bash
set -e

mongo <<EOF
db.auth($MONGO_INITDB_ROOT_USERNAME, $MONGO_INITDB_ROOT_PASSWORD)
db = db.getSiblingDB($MONGO_INITDB_DATABASE)
db.createUser({
  user:  '$DB_USERNAME',
  pwd: '$DB_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF