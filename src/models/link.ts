import Sequelize from 'sequelize';
import database from '../config/db';
import Port from './port';

const Link = database.define('link', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false
    },
    target: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sourcePort: {
        type: Sequelize.STRING,
        allowNull: false
    },
    targetPort: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sourceLabel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    targetLabel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    networkId: {
        type: Sequelize.STRING,
        allowNull: true
    },
    projectId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


export default Link;