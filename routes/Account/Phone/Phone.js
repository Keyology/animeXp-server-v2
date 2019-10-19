const helper = require('./PhoneHelper')

exports.getPhoneAndCarrier = async function (req, res) {
  const body = {
    token: req.headers.token
  }
  const { phoneNumber, carrier, errorMessage } = await helper.getPhoneAndCarrierLogic(body)
  if (phoneNumber && carrier) {
    return res.json({ phoneNumber, carrier }).status(200)
  } else {
    return res.status(503).send({ message: errorMessage })
  }
}

exports.setPhoneAndCarrier = async function (req, res) {
  const body = {
    token: req.headers.token,
    phoneNumber: req.body.phone_number,
    carrier: req.body.carrier
  }
  const bodyInvalidMessage = helper.bodyInvalid(body)
  if (bodyInvalidMessage) return res.status(412).send({ message: bodyInvalidMessage })
  const { success, phoneNumber, carrier, errorMessage } = await helper.setPhoneAndCarrierLogic(body)

  if (success) {
    return res.json({ phoneNumber, carrier }).status(200)
  } else {
    return res.status(503).send({ message: errorMessage })
  }
}
