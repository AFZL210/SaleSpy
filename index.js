import inquirer from 'inquirer';
import axios from 'axios';
import cheerio from 'cheerio';
let amazonHandle;

const amazonInfo = {
    name : '',
    link : '',
    price : ''
};



const productInfo = {
    AMAZON_URL : "",
    PRODUCT_NAME : "",
    REMINDER_MSG : "Buy Now!",
    DESIRED_PRICE: 0,
    COUNTRY_CODE: "",
    MOBILE_NUMBER: 999999,
    EMAIL: "abc@xyz.com",
    CHECK_INTERVAL: "10000",
    PRICE: 0,
}

const questions = [
    {
        type: 'input',
        name: 'amazon_url',
        message: "Enter Amazon URL :",
    },
    {
        type: 'input',
        name: 'reminder_msg',
        message: "Enter Reminder Message :",
    },
    {
        type: 'input',
        name: 'desired_price',
        message: "Enter Desired Price :",
    },
    {
        type: 'input',
        name: 'country_code',
        message: "Enter Country Code :",
    },
    {
        type: 'input',
        name: 'mobile_number',
        message: "Enter Mobile Number :",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter Email :",
    },
    {
        type: 'input',
        name: 'check_interval',
        message: "Enter Check Interval in (ms) :",
    },
];

const amazonParser = async (info) => {
    console.log(info)
    const { data } = await axios.get("https://www.amazon.in/GIGABYTE-WINDFORCE-pci_e_x16-Graphics-GV-N3060WF2OC-12GD/dp/B0BNP2CMXM/"); 
    const $ = cheerio.load(data);
    const item = $('div.a-section');
    const titleBox = $('div#titleSection')

    const title = $(titleBox).find('h1#title').first().text().replace(/[,.]/g, '');
    info.PRODUCT_NAME = title;

    const price = $(item).find("span.a-price-whole")
    .first().text().replace(/[,.]/g, '');

    if(price <= 100000) {
        console.log("BUY NOW")
        console.log(info)
        clearInterval(amazonHandle)
    }

    info.PRICE = parseInt(price);
}


const takeUserInput = (productInfo) => {
    inquirer.prompt(questions).then(answers => {
        productInfo.AMAZON_URL = answers.amazon_url;
        productInfo.REMINDER_MSG = answers.reminder_msg;
        productInfo.DESIRED_PRICE = answers.desired_price;
        productInfo.EMAIL = answers.email;
        productInfo.COUNTRY_CODE = answers.country_code;
        productInfo.CHECK_INTERVAL = answers.check_interval;
        productInfo.MOBILE_NUMBER = answers.mobile_number;
        console.log(productInfo.AMAZON_URL)
        amazonHandle = setInterval(() => amazonParser(productInfo), productInfo.CHECK_INTERVAL);
    });
}

takeUserInput(productInfo);
