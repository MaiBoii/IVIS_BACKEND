const Sequelize = require('sequelize');

module.exports = class Apply extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            sid:{
                type: Sequelize.STRING(20),
                allowNull:false,
                primaryKey: true,
                unique: true
            },
            intro: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            language: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            project: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            languagePlan: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            projectPlan: {
                type: Sequelize.TEXT,
                allowNull: true
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Apply',
            tableName: 'apps',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {}
};