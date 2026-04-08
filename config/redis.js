const {createClient} = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL 
    // Default: redis://localhost:6379
});

redisClient.on("connect", () => {
    console.log("Redis client connected");
});

redisClient.on("error", (err) => {
    console.log("Redis client error", err);
});

redisClient.connect();

module.exports = redisClient;