let { verify, sign } = require('jsonwebtoken')
let SECRET_KEY = "_edo";


module.exports = {
  sign: (payload) => sign(payload, SECRET_KEY),
  verify: (token) => verify(token, SECRET_KEY)
}