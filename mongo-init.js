db.createUser(
    {
        user: "user",
        pwd: "1234",
        roles: [
            {
                role: "readWrite",
                db: "restaurant"
            }
        ]
    }
);
// db.createCollection("test");