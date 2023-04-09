import inquirer from "inquirer";
import axios from "axios";
import cheerio from "cheerio";
import twilio from "twilio";

const twilioInfo = {
    TWILIO_NUMBER: "+15074738981",
    SID: "AC13b7ec2905bb3ad84f55ee4df154c9ae",
    AUTH_TOKEN: "4a3be840af99061effc9c2a479a88ac7",
};

const messenger = twilio(twilioInfo.SID, twilioInfo.AUTH_TOKEN);

const sendAlert = (twilioInfo, info) => {
    messenger.messages
        .create({
            from: twilioInfo.TWILIO_NUMBER,
            to: info.MOBILE_NUMBER,
            body: info.REMINDER_MSG,
        })
        .then((res) => {
            console.log(res.body);
        });
};

let amazonHandle;

let productInfo = {
    AMAZON_URL: "",
    PRODUCT_NAME: "",
    REMINDER_MSG: "Buy Now!",
    DESIRED_PRICE: 0,
    COUNTRY_CODE: "",
    MOBILE_NUMBER: "",
    EMAIL: "abc@xyz.com",
    CHECK_INTERVAL: "10000",
    PRICE: 0,
};


const questions = [
    {
        type: "input",
        name: "amazon_url",
        message: "Enter Amazon URL :",
    },
    {
        type: "input",
        name: "reminder_msg",
        message: "Enter Reminder Message :",
    },
    {
        type: "input",
        name: "desired_price",
        message: "Enter Desired Price :",
    },
    {
        type: "input",
        name: "mobile_number",
        message: "Enter Mobile Number :",
    },
    {
        type: "input",
        name: "email",
        message: "Enter Email :",
    },
    {
        type: "input",
        name: "check_interval",
        message: "Enter Check Interval in (ms) :",
    },
];

const amazonParser = async (info) => {
    const { data } = await axios.get(
        info.AMAZON_URL
    );
    const $ = cheerio.load(data);
    const item = $("div.a-section");
    const titleBox = $("div#titleSection");

    const title = $(titleBox)
        .find("h1#title")
        .first()
        .text()
        .replace(/[,.]/g, "");
    info.PRODUCT_NAME = title;

    const price = $(item)
        .find("span.a-price-whole")
        .first()
        .text()
        .replace(/[,.]/g, "");

    if (price <= parseInt(info.DESIRED_PRICE)) {
        sendAlert(twilioInfo, info);
        clearInterval(amazonHandle);
    }

    info.PRICE = parseInt(price);
};

const takeUserInput = (productInfo) => {
    inquirer.prompt(questions).then((answers) => {
        productInfo.AMAZON_URL = answers.amazon_url;
        productInfo.REMINDER_MSG = answers.reminder_msg;
        productInfo.DESIRED_PRICE = answers.desired_price;
        productInfo.EMAIL = answers.email;
        productInfo.CHECK_INTERVAL = answers.check_interval;
        productInfo.MOBILE_NUMBER = answers.mobile_number;

        amazonHandle = setInterval(
            () => amazonParser(productInfo),
            productInfo.CHECK_INTERVAL
        );
    });
};

takeUserInput(productInfo);
