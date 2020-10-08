mongo -- "$MONGO_DATABASE" <<EOF
    const rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    const rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    const admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    const user = '$MONGO_INITDB_USERNAME';
    const passwd = '$MONGO_INITDB_PASSWORD';
    db.createUser({user: user, pwd: passwd, roles: ["readWrite"]});
EOF