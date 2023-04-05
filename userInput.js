import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'amazon_url',
        message: "Enter Amazon URL :",
    },
    {
        type: 'input',
        name: 'flipkart_url',
        message: "Enter Flipkart URL :",
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
        productInfo.FLIPKART_URL = answers.flipkart_url;
        productInfo.REMINDER_MSG = answers.reminder_msg;
        productInfo.DESIRED_PRICE = answers.desired_price;
        productInfo.EMAIL = answers.email;
        productInfo.COUNTRY_CODE = answers.country_code;
        productInfo.CHECK_INTERVAL = answers.check_interval;
        productInfo.MOBILE_NUMBER = answers.mobile_number;
        console.log(productInfo)
    });

}

export { takeUserInput }