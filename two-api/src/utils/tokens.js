import jwt from "jsonwebtoken";
import config from "../config.js";

export function generateToken(user) {
    return jwt.sign(
        { id: user.id, license: user.license },
        config.jwt.secret,
        { expiresIn: config.jwt.expires }
    );
}

export function verifyToken(token) {
    return jwt.verify(token, config.jwt.secret);
}
