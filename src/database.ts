import sequelize from './config/db';

async function start(){
    const Link = require('./models/link');
    const Port = require('./models/port');
    const Device = require('./models/device');
    await sequelize.sync();
}

export default start;