const Sequelize = require('sequelize');

module.exports = class Reserve extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            sid: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            day: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            time: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            reserved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Reserve',
            tableName: 'reserves',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) { }
};