Neptune is an hosted event driven out going communication system along with event analytics.

You can fire events to Neptune and react to them for Emails, SMS, Push and App/Dashboard Notifications.

## Step 1:

- Create a Team at Neptune
- Create an API Token
- Create a `dev` Environment and mark it as Mock

## Step 2:

Install

`npm install @teurons/neptune-nodejs --save`

or

`yarn add @teurons/neptune-nodejs`

To Update, just run above commands

## Step 3:

Configure following in your .ENV

```
NEPTUNE_ENV=dev
NEPTUNE_TOKEN=<paste_your_api_token_here>
```

That's it. You have configured Neptune.

# Usage

## Send Event

```js
const neptune = require("@teurons/neptune-nodejs");

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
```

- eventType - It can be any string, you can following any convention. In above example we used underscore separated lower cases alphanumeric characters.
- eventData - Data is optional, and can be just empty array. This data is actually sent to your templates, so that the communication sent to your user can be dynamic. The keys from this array would be used to prefill templates data, if you used variables like `{{ otp }}` in your email/sms template.
- neptuneData = You can use Neptune Data to sent user_id, contact information and more. You can check available contactTypes here: https://teurons.com/docs/neptune/usage/contact-types
