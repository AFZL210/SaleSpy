import axios from "axios";
import  cheerio  from "cheerio";

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


const amazonParser = async () => {
        const { data } = await axios.get(""); 
        const $ = cheerio.load(data);
        const item = $('div.a-section');
        const titleBox = $('div#titleSection')

        const title = $(titleBox).find('h1#title').first().text().replace(/[,.]/g, '');
        console.log(title)
    
        const price = $(item).find("span.a-price-whole")
        .first().text().replace(/[,.]/g, '');

        if(price <= 1000000) {
            console.log("BUY NOW")
            clearInterval(amazonHandle)
        }
    
        amazonInfo.price = parseInt(price);
}

const amazonHandle = setInterval(amazonParser, 1000);