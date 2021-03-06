//Initializing the constants
const [PORT, HOSTNAME] = [9000, 'localhost'];
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');
let DB;
//CONNECT DATABASE ON_LINE or OFFLINE
process.argv.forEach((argv) => {
  if (argv === '--online') {
    DB = process.env.DATABASE.replace(
      '<password>',
      process.env.DATABASE_PASSWORD
    );
  } else {
    DB = process.env.DATABASE_LOCAL.replace(
      '<password>',
      process.env.DATABASE_PASSWORD
    );
  }
});
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection to database is successfull!'));

// SERVER START
app.listen(process.env.PORT || PORT, HOSTNAME, () => {
  console.log(`Server is running on port ${PORT} and addressed to ${HOSTNAME}`);
});
