let redis = require('redis');
let redisClient = redis.createClient();
const key = 'data';
let data = ['data', 1, 2, 3, 4, 5];
console.log("Key: " + key + " Data: " + data);

var testData = [1, 50, 60, 80, 100];


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
};

const new newData = (data) => {
    labels: data.labels,
    datasets: 
} 

/*
redisClient.on('connect', function() {
    console.log('Connected to Redis');
})


var i;
for ( i= 0; i < 20; i++) {
    redisClient.hmset('newdataTest', {time: new Date(), temp: i});

}

redisClient.hgetall('newdataTest', (err, obj) => {
    console.log(obj)
});
*/