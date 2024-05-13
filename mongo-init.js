db = db.getSiblingDB('admin');

db.createUser({
    user: 'local-user',
    pwd: 'local-password',
    roles: [
        {
            role: 'readWrite',
            db: 'local'
        }
    ]
});

console.log("User: ", db.getUser("local-user"));