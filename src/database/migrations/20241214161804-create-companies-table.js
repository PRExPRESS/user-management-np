'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('companies', { 
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createAt:{
          type: Sequelize.DATE,
          allowNull: false
        },
        updateAt:{
          type: Sequelize.DATE,
          allowNull: false
        }
      });
     
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('companies');
     
  }
};
