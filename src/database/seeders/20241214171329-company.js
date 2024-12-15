'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('companies', [
        {name: 'Apple.Inc', createAt: new Date(), updateAt: new Date()},
        {name: 'Google.Inc', createAt: new Date(), updateAt: new Date()},
        {name: 'Microsoft.Inc', createAt: new Date(), updateAt: new Date(),},
        {name: 'Amazon.Inc', createAt: new Date(), updateAt: new Date(),},
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('companies', null, {});
     
  }
};
