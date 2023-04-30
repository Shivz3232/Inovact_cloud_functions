const addUser = `mutation addUser($userName: String, $email: String, $cognitoSub: String) {
  insert_user(objects: [{user_name: $userName, email_id: $email, cognito_sub: $cognitoSub}]) {
    returning {
      id
    }
  }
}`;

const addUserVerbose = `mutation addUserVerbose($userName: String, $email: String, $cognitoSub: String, $firstName: String, $lastName: String, $avatar: String, $phoneNumber: String) {
  insert_user(objects: [{user_name: $userName, email_id: $email, cognito_sub: $cognitoSub, first_name: $firstName, last_name: $lastName, avatar: $avatar, phone_number: $phoneNumber}]) {
    returning {
      id
    }
  }
}`;

module.exports = {
  addUser,
  addUserVerbose,
};
