'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('admins', [{
        name: 'Test Admin',
        email: '6E0dH@example.com',
        password: '12345abc',
        phone: '1234567890',
        address: 'Test Address',
        createdAt: new Date(),
        updatedAt: new Date()
        
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('admins', null, {});
     
  }
};
