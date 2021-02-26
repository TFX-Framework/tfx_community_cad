const mongoose = require('mongoose');
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

    console.log(`Connected to the database`);

    await new App(client).listen(process.env.PORT || 8080);

    console.log(`Running on PORT: ${PORT}`)
})()
