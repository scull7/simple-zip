/*eslint-env node, mocha*/
var demand = require('must')
var zip    = require('../index.js')

var example_twitter_post =
  require('./assets/example-twitter-response.json')


describe('simple-zip', function() {


  it('should be able to deflate/inflate serializable (JSON) objects',
  function() {

    var test_buffer = Buffer.from(JSON.stringify(example_twitter_post))
    var test_length = test_buffer.length

    return zip.deflateFromObj(example_twitter_post)

    .then(function(deflated) {

      demand(deflated.length).to.be.below(test_length)

      return zip.inflateToObj(deflated)

    })


    .then(function(actual) {

      demand(actual).eql(example_twitter_post)

    })

  })


  describe('::deflate', function() {


    it('should reject the promise with an error if the buffer given is ' +
    'not a Buffer object', function() {

      return zip.deflate({ foo: 'bar' })

      .then(function(x) {

        throw new Error('Unexpected Success: x')

      })

      .catch(function(e) {

        demand(e).be.an.instanceof(TypeError)
        demand(e.message).eql('Invalid non-string/buffer chunk')

      })

    })

  })


  describe('::deflate', function() {


    it('should reject the promise with an error if the buffer given is ' +
    'not a Buffer object', function() {

      return zip.inflate({ foo: 'bar' })

      .then(function(x) {

        throw new Error('Unexpected Success: x')

      })

      .catch(function(e) {

        demand(e).be.an.instanceof(TypeError)
        demand(e.message).eql('Invalid non-string/buffer chunk')

      })

    })


  })


})
