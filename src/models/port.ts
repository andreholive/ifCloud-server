import Sequelize from 'sequelize';
import database from '../config/db';
import { PortState } from '../core/core-models/ServerPortModel';

const Port = database.define('port', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    portId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue:2
    },
    networkId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    subnetId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    macAddr: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fixedIp: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        defaultValue:PortState.disconnected
    },
    enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
    }
});

export default Port;