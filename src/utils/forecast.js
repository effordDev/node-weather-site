const request = require( 'request' )

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a6c047a27db8a400e982a38809aca9a9/' + lat + ',' + long + '?units=si'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find forcast, please try again', undefined)
        } else {
            if(body.currently.precipProbability === 0){
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + 
                body.currently.temperature + ' degrees out.')
            } else {
                callback(undefined, body.daily.data[0].summary + ' It is currently ' + 
                body.currently.temperature + ' degrees out. There is a ' + 
                body.currently.precipProbability + '% chance of ' + 
                body.currently.precipType + '.')
            }
        }
    })
}

module.exports = forecast