const requests = new Map();

export function rateLimit(maxReq, windowMs) {
    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();

        if (!requests.has(ip)) {
            requests.set(ip, []);
        }

        const timestamps = requests.get(ip)
            .filter(t => now - t < windowMs);

        timestamps.push(now);
        requests.set(ip, timestamps);

        if (timestamps.length > maxReq) {
            return res.status(429).json({ error: "Too many requests" });
        }
        next();
    };
}
