require("./config");

const neptune = require("@teurons/neptune-nodejs");

// neptune.init("lol", "me");

(async () => {
  let eventType = "login_with_otp";
  let eventData = {
    otp: 123456,
  };
  let neptuneData = {
    user_id: "343-4324-23432",
    contact_infos: [
      { type: "email", value: "rajiv@example.com" },
      { type: "mobile_number", value: "+1XXXXXXXX" },
    ],
  };

  await neptune.fire(eventType, eventData, neptuneData);

  //   let environments = await neptune.fetchEnvironments();
  let response = await neptune.fire(
    "request_otp_to_login_through_email",
    {
      type: "email",
      token: "628439",
      value: "rajiv@betalectic.com",
    },
    {
      user_id: "10",
    }
  );

  console.log("res", response);
})();
