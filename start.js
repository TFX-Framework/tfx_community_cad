const mongoose = require('mongoose');
const colors = require('colors');

const bot = require('./index');
const App = require('./app');
const { PORT, DISCORD_TOKEN, DB_URI } = process.env;

(async () => {

   await mongoose.connect(DB_URI, { 
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    
    let client = await bot.init(DISCORD_TOKEN);

    console.log(colors.yellow(`Connected to the database on `) + colors.underline.green(DB_URI));

    await new App(client).listen(process.env.PORT || 8080);

    console.log(colors.yellow(`Running on port `) + colors.underline.green(PORT || 8080));
})()
