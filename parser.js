const axios = require("axios");
const cheerio = require("cheerio");
const { AMAZON_URL, FLIPKART_URL, DESIRED_PRICE, EMAIL, CHECK_FOR, CHECK_INTERVAL, PHONE_NUMBER } = require("./test_config")

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

// url = "https://www.amazon.in/GIGABYTE-WINDFORCE-pci_e_x16-Graphics-GV-N3060WF2OC-12GD/dp/B0BNP2CMXM/"


const amazonParser = async () => {
        const { data } = await axios.get(AMAZON_URL); 
        const $ = cheerio.load(data);
        const item = $('div.a-section');
        const titleBox = $('div#titleSection')

        const title = $(titleBox).find('h1#title').first().text().replace(/[,.]/g, '');
        console.log(title)
    
        const price = $(item).find("span.a-price-whole")
        .first().text().replace(/[,.]/g, '');

        if(price <= DESIRED_PRICE) {
            console.log("BUY NOW")
            clearInterval(amazonHandle)
        }
    
        amazonInfo.price = parseInt(price);
}

const amazonHandle = setInterval(amazonParser, CHECK_INTERVAL);