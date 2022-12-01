import Sequelize from 'sequelize';
import database from '../config/db';
import Port from './port';

const Device = database.define('device', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    device: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    instanceId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    projectId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue:2
    },
    locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    x: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});



Device.hasMany(Port, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});

Port.belongsTo(Device);

export default Device;