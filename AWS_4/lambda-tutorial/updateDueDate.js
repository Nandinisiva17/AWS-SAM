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
    const records = await table
      .select({
        filterByFormula: "DATETIME_DIFF({Due Date}, TODAY(), 'd') = 7"
      })
      .all()

    for (record of records) {
      var x = new Date(record.fields["Due Date"])
      await table.update(record.fields.ID, {
        "Due Date": addDays(x, 10).toISOString()
      })
    }

    function addDays(date, days) {
      var result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }

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
        message: "Successfully Updated Record Due Date"
      })
    }
  } catch (err) {
    console.log(err)
    return err
  }

  return response
}
