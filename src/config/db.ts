import {Sequelize} from 'sequelize';
const sequelize = new Sequelize('ifCloud','root','gaboardi', {
    dialect: 'mysql',
    host: '192.168.0.104',
    port: 3306
});

export default sequelize;