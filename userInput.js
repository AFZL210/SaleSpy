import inquirer from 'inquirer';
import axios from "axios";
import  cheerio  from "cheerio";

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

const takeUserInput = (productInfo) => {
    inquirer.prompt(questions).then(answers => {
        productInfo.AMAZON_URL = answers.amazon_url;
        productInfo.REMINDER_MSG = answers.reminder_msg;
        productInfo.DESIRED_PRICE = answers.desired_price;
        productInfo.EMAIL = answers.email;
        productInfo.COUNTRY_CODE = answers.country_code;
        productInfo.CHECK_INTERVAL = answers.check_interval;
        productInfo.MOBILE_NUMBER = answers.mobile_number;

    const amazonHandle = setInterval(amazonParser(productInfo), parseInt(info.CHECK_INTERVAL));
        console.log(productInfo)
    });
}


const amazonInfo = {
    name : '',
    link : '',
    price : ''
};

const flipkartInfo = {
    name : '',
    link : '',
    price : ''
};


const amazonParser = async (info) => {
        const { data } = await axios.get(info.AMAZON_URL); 
        const $ = cheerio.load(data);
        const item = $('div.a-section');
        const titleBox = $('div#titleSection')

        const title = $(titleBox).find('h1#title').first().text().replace(/[,.]/g, '');
        console.log(title)
    
        const price = $(item).find("span.a-price-whole")
        .first().text().replace(/[,.]/g, '');

        if(price <= parseInt(info.DESIRED_PRICE)) {
            console.log("BUY NOW")
            clearInterval(amazonHandle)
        }
    
        amazonInfo.price = parseInt(price);
}

export { takeUserInput }