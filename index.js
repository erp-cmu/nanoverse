const axios = require("axios");

// Input
const baseURL = "your-base-url-here";
const token = "your-token-here";
const customerName = "Test Customer 2";

// Code
const url = `${baseURL}/api/resource/Customer`;
axios({
  method: "post",
  url: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `token ${token}`,
  },
  data: { customer_name: customerName },
}).then((response) => {
  console.log(response.data);
});
