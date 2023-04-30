const axios = require("axios");
const { defineString } = require("firebase-functions/params");

const hasura_api = defineString("HASURA_API");
const hasura_admin_secret = defineString("HASURA_ADMIN_SECRET");

//? This is a utility function for querying the postgresql database
async function query(query, variables = {}) {
  const result = await axios
    .post(
      hasura_api.value(),
      { query, variables },
      {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": hasura_admin_secret.value(),
        },
      }
    )
    .then((response) => {
      const responseData = response.data;

      if (responseData.data) {
        return {
          success: true,
          result: responseData,
        };
      } else {
        return {
          success: false,
          errors: responseData.errors,
        };
      }
    })
    .catch((err) => {
      return {
        success: false,
        errors: err,
      };
    });

  return result;
}

module.exports = { query };
