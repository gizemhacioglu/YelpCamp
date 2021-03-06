const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "606856857392e725ac2b9c10",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {

                    url: 'https://res.cloudinary.com/dfxmwe97w/image/upload/v1617635656/YelpCamp/mg3gawmufsmfd1lwoijd.jpg',
                    filename: 'YelpCamp/mg3gawmufsmfd1lwoijd'
                },
                {

                    url: 'https://res.cloudinary.com/dfxmwe97w/image/upload/v1617635654/YelpCamp/tu4tmcqzy1u0t27vk5jr.jpg',
                    filename: 'YelpCamp/tu4tmcqzy1u0t27vk5jr'
                },
                {

                    url: 'https://res.cloudinary.com/dfxmwe97w/image/upload/v1617635654/YelpCamp/gez2bb2azmhtzfe3oawq.jpg',
                    filename: 'YelpCamp/gez2bb2azmhtzfe3oawq'
                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})