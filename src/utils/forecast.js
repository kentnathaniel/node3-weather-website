const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ec3de87082f940bae1750c081a19671&query=' + lat + ',' + lon + '&units=m'

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const current = body.current.temperature
            const feels = body.current.feelslike
            const weatherDescription = body.current.weather_descriptions[0]
            callback (undefined, `${weatherDescription}. It is currently ${current} degrees out. It feels like ${feels} degrees out.`)
        }

    })
}

module.exports = forecast