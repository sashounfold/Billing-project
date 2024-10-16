const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});
client.set('basic_plan', JSON.stringify({
    name: 'Basic Plan',
    price: 10.00,
    minutes_included: 1000
}))
client.get('basic_plan', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data)); 
});
