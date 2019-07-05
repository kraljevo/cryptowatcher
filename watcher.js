const nodemailer = require("nodemailer");
const axios = require("axios");
require('dotenv').config();

const dataValues = require('./routes/priceWatchers')
const cckey = process.env.CCAPI;
const sendUser = process.env.SENDUSER;
const sendPass = process.env.PASSWORD;
const toAddress = dataValues.priceWatchers['1'].email;
const priceLow = dataValues.priceWatchers['1'].priceLow;
const priceHigh = dataValues.priceWatchers['1'].priceHigh;
console.log(toAddress);
console.log(priceLow);
console.log(priceHigh);
let prevEmail;

checkPrice = () => {
    axios
        .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD&api_key=${cckey}`)
        .then(resp => {
            let coinPrice = resp.data.BTC.USD;
            async function main() {
                let transporter = nodemailer.createTransport({
                    host: "smtp.mail.yahoo.com",
                    port: 465,
                    service: 'yahoo',
                    secure: true,
                    auth: {
                        user: sendUser,
                        pass: sendPass
                    }
                })
                
                console.log('Checking price...')
                if(coinPrice < priceLow){
                    if(prevEmail !== 'low'){
                        console.log('Price low--sending email...')
                        let info = await transporter.sendMail({
                            from: sendUser,
                            to: toAddress,
                            subject: "Bitcoin Price Update",
                            html: `
                            <h1 style='text-align: center; color: #ffffff; background-color: #00b0ba; width: 100%; padding: 10px 0; border-radius: 3px;'>Bitcoin Watcher</h1>
                            <h2 style='color: #00b0ba'>The price of Bitcoin is low. The price is currently $${coinPrice.toLocaleString()}.</h2>
                            <h3>It's a good time to buy! For detailed price information, please visit your favorite cryptocurrency wallet service. I'm only a robot, but my master recommends <a href="https://www.coinbase.com/">coinbase</a>.</h3>
                            <p style='color: #898989; text-align: center;'>This email is provided by Bitcoin Watcher.</p>
                            `
                        }, function(err){
                            if(err){
                                console.log(err)
                            }
                        })
                        prevEmail = 'low';
                    }
                }

                if(coinPrice > priceHigh){
                    if(prevEmail !== 'high'){
                        console.log('Price high--sending email...')
                        let info = await transporter.sendMail({
                            from: sendUser,
                            to: toAddress,
                            subject: "Bitcoin Price Update",
                            html: `
                                <h1 style='text-align: center; color: #ffffff; background-color: #00b0ba; width: 100%; padding: 10px 0; border-radius: 3px;'>Bitcoin Watcher</h1>
                                <h2 style='color: #00b0ba'>The price of Bitcoin is high. The price is currently $${coinPrice.toLocaleString()}.</h2>
                                <h3>It's a good time to sell! For detailed price information, please visit your favorite cryptocurrency wallet service. I'm only a robot, but my master recommends <a href="https://www.coinbase.com/">coinbase</a>.</h3>
                                <p style='color: #898989; text-align: center;'>This email is provided by Bitcoin Watcher.</p>
                            `
                        }, function(err){
                            if(err){
                                console.log(err)
                            }
                        })
                        prevEmail = 'high';
                    }
                }
            }
            main().catch(console.error);
        })
        .catch(err => {
            console.log(err);
        })
    setTimeout(checkPrice, 600000)
}
setTimeout(checkPrice, 0)

checkPrice();