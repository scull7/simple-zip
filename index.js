
var R        = require('ramda')
var zlib     = require('zlib')
var Bluebird = require('bluebird')


var DEFAULT_COMPRESSION_OPTIONS = {
  level: zlib.Z_BEST_COMPRESSION
}


 function deflate(buffer) {
  return new Bluebird(function(resolve, reject) {

    zlib.gzip(buffer, DEFAULT_COMPRESSION_OPTIONS, function(err, compressed) {
      return err ? reject(err) : resolve(compressed)
    })

  })
}


function inflate(buffer) {
  return new Bluebird(function(resolve, reject) {

    zlib.gunzip(buffer, {}, function(err, data) {

      return err ? reject(err) : resolve(data)

    })

  })
}


// deflateFromObj :: Object -> Promise Buffer
var deflateFromObj = R.composeP(
  deflate
, Buffer.from
, R.compose(Bluebird.resolve, JSON.stringify)
)


// inflateToObj :: Buffer -> Promise Object
var inflateToObj = R.composeP(
  JSON.parse
, function (inflated) { return inflated.toString() }
, inflate
)


module.exports = {
  deflate: deflate
, inflate: inflate

, deflateFromObj: deflateFromObj
, inflateToObj: inflateToObj
}
