// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response
var airtable = require("airtable")
const env = require("dotenv").config()
var base = new airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_PRACTICE_BASE)
const table = base("Todo List")
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    const id = event.pathParameters.id
    const deletedRecord = await table.destroy(id)
    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: "Successfully deleted record"
      })
    }
  } catch (err) {
    console.log(err)
    return err
  }
  return response
}
