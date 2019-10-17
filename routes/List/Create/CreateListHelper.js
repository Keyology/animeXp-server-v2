const validate = require('../../../common/validator')

// check if input is valid -- DONE

// input list, name, description jwt token
// once input is validedated check if user has an account
// check if list is empty
// if list is empty create user and jwt token
// save user list to db
// send jwt token
// if list is not empty  call background job to get poster img, title,  & description for list
// get recommendations for list
// then save the results

// if user has an account sent status code 200
// other wise send jwt
exports.createListLogic = async function (req, res) {
  // const data = {
  //   token: req.headers.token,
  //   listName: req.body.listName,
  //   listDescription: req.body.listDescription,
  //   listItems: req.body.listItems
  // }
  // const invalidDataErrorMessage = helper.dataValid(data)
  // if (invalidDataErrorMessage) return res.status(412).send({ message: invalidDataErrorMessage })

  // const { success, errorMessage } = helper.createListLogic(data)
  // const statusCode = success ? 200 : 503
  // return res.json({ success, message: errorMessage }).status(statusCode)
}

exports.bodyValid = function (body) {
  return true
  // const data = {
  //   token: req.headers.token,
  //   listName: req.body.listName,
  //   listDescription: req.body.listDescription,
  //   listItems: req.body.listItems
  // }
  // let errorMessage = null
  // if (body.hasPhoneNumber === true) {
  //   const validPhoneNumber = validate.validatePhoneNumber(body.phoneNumber)
  //   const validCarrier = validate.validateCarrier(body.carrier)
  //   if (!validPhoneNumber || !validCarrier) {
  //     errorMessage = (
  //       !validPhoneNumber && !validCarrier ? 'Invalid phone number and carrier' : (
  //         !validPhoneNumber ? 'Invalid phone number' : 'Invalid carrier'
  //       )
  //     )
  //   }
  // }
  // return errorMessage
}
