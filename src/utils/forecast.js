const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8ac0542814baf785593f639c19d74091/' + latitude + 
    ',' + longitude
    request( { url, json: true}, (error, { body }) => {
        if(error){
            callback('Was not able to connect to location services', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' +
             body.currently.precipProbability + '% chance of rain. The high for the day is ' + body.daily.data[0].temperatureHigh + ' and the low is ' + body.daily.data[0].temperatureLow)
        }
    })
}


module.exports = forecast