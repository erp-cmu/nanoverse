import axios from "axios";
import "dotenv/config";

// Input
const inputData = {
  customer_name: "สมชาย ใจดี",
  // customer_name: "บัณฑิต สุขใจ",
  items: [
    { item_code: "ITEM001", qty: 2, rate: 100, delivery_date: "2024-03-10" },
    { item_code: "ITEM002", qty: 4, rate: 100, delivery_date: "2024-03-10" },
  ],
};

//--------------------- Code ---------------------//
const baseURL = process.env.BASE_URL;
const token = process.env.TOKEN;
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `token ${token}`,
};
// console.log(baseURL, token, customerName);

async function createCustomer(customer_name) {
  const url = `${baseURL}/api/resource/Customer`;
  const data = { customer_name: customer_name, customer_type: "Individual" };
  try {
    const res = await axios({
      method: "post",
      url: url,
      headers: headers,
      data: data,
    });
    return res.data.data;
  } catch (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
}

async function searchCustomer(customer_name) {
  const url = `${baseURL}/api/resource/Customer`;
  const params = new URLSearchParams();
  params.append("fields", '["*"]');
  params.append("filters", `[["customer_name", "=", "${customer_name}"]]`);
  try {
    const res = await axios({
      method: "get",
      url: url,
      params: params,
      headers: headers,
    });
    const customers = res.data.data;
    console.log(customers);
    return customers;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function createSaleOrder(customer_name_pk, items) {
  const url = `${baseURL}/api/resource/Sales Order`;
  const data = {
    customer: customer_name_pk,
    docstatus: 1, // Submitted
    items: items,
  };
  try {
    const res = await axios({
      method: "post",
      url: url,
      headers: headers,
      data: data,
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return Promise.reject(error);
  }
}

async function main(inputData) {
  let customer = null;
  const customers = await searchCustomer(inputData.customer_name);
  if (customers.length === 0) {
    customer = await createCustomer(inputData.customer_name);
    console.log("New customer created", customer.name);
  } else {
    customer = customers[0];
    console.log("Customer found", customer.name);
  }

  const customer_name_pk = customer.name;
  const saleOrder = await createSaleOrder(customer_name_pk, inputData.items);
  console.log("Sale order created", saleOrder);
}

main(inputData);
