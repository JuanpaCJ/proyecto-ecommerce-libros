const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/CRUD';
const client = new MongoClient(url);

const DBconnection = async () => {
  try {
    const connection = await client.connect();
    console.log('MongoDB Connected');
    return connection.db('CRUD');
  } catch (error) {
    console.error('Error', error.message);
    process.exit(1);
  }
};

module.exports = DBconnection;
