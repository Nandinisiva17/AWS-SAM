// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response
// import { v4 as uuidv4 } from "uuid"
var airtable = require("airtable")
const { v4: uuidv4 } = require("uuid")
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
exports.lambdaHandler = async (event, context, callback) => {
  try {
    let name = JSON.parse(event.body)
    const createRecord = await table.create(
      {
        "Due Date": name.duedate,
        Status: name.status,
        Task: name.task,
        uuid: name.uuid
      }

      // {
      //   "Due Date": name.duedate,
      //   Status: name.status,
      //   Task: name.task,
      //   uuid: uuidv4()
      // }
      // function (err, records) {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }
      //   records.forEach(function (record) {
      //     task.id = record.getId()
      //     console.log(task.id)
      //   })
      // }
    )
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONSx`x`"
      },
      body: JSON.stringify({ message: "successfully created again amd again" })
    }
  } catch (e) {
    console.log("error")
    return e
  }
}
