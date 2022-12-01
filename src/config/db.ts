import {Sequelize} from 'sequelize';
const sequelize = new Sequelize('ifCloud','root','gaboardi', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

export default sequelize;