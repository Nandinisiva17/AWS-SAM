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
    const uuid = event.pathParameters.id

    const record = await table
      .select({
        filterByFormula: `{uuid}= "${uuid}"`
      })
      .all()
    const deletedRecord = await table.destroy(record[0].fields.ID)

    response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "'Content-Type  ,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
      },
      body: JSON.stringify({
        message: record[0].fields.ID
      })
    }
  } catch (err) {
    console.log(err)
    return err
  }

  return response
}
