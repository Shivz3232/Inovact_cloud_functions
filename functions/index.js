const functions = require("firebase-functions");

const { query: Hasura } = require("./utils/hasura");
const { addUser, addUserVerbose } = require("./queries/mutations");

exports.addUserToDB = functions
  .region("asia-south1")
  .auth.user()
  .onCreate(async (user) => {
    const email = user.email;
    const uid = user.uid;

    let variables = {
      email,
      userName: email + "_" + uid,
      cognitoSub: uid,
    };

    if (user.providerData[0].providerId == "password") {
      const response = await Hasura(addUser, variables);

      if (!response.success) {
      }
      console.log(
        "On Create Trigger Error: Failed to create user in DB. Error: ",
        JSON.stringify(response.errors)
      );
    } else {
      variables["firstName"] = user["displayName"];
      variables["lastName"] = user["displayName"];
      variables["avatar"] = user["photoURL"];
      variables["phoneNumber"] = user["phoneNumber"];

      const response = await Hasura(addUserVerbose, variables);

      if (!response.success)
        console.log(
          "On Create Trigger Error: Failed to create user in DB. Error: ",
          JSON.stringify(response.errors)
        );
    }
  });
