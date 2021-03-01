/*
let redis = require('redis');
let redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log('Connected to Redis');
})

redisClient.lpush(dbname, counter);
        randInt = Math.floor(Math.random() * 5) + 1;
        if (randInt == 1) {
            redisClient.ltrim(dbname, 0, 10);
            
            redisClient.lrange('data', 0, -1, (err, obj) => {
                console.log(obj)
            })
        }



*/