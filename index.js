'use strict'

var fs = require('fs')
var stream = fs.createReadStream('./LocationHistory.json', {encoding: 'utf8'})
var json = ''

stream.on('data', function (chunk) {
  json += chunk
})

stream.once('end', function () {
  var places = JSON.parse(json)['locations']
  var locations = places.map(function (loc) {
    return {
      'latitude': loc.latitudeE7 / 10000000,
      'longitude': loc.longitudeE7 / 10000000
    }
  })

  console.log('Locations:', locations.length)

  fs.writeFile('LatLng.json', JSON.stringify(locations), 'utf8', function (err) {
    console.log(err || 'done!')
  })
})
