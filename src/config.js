import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: "7d"
    }
};

