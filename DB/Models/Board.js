var Sequelize = require('sequelize');
var sequelize = require('../sequelize.js');

var Board = sequelize.define('BOARD', {
  Seq: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: Sequelize.STRING,
    validate: {len: [1,255]},  
    allowNull: true,
    
  },
  Content: {
    type: Sequelize.STRING,
    validate: {len: [1,500]},  
    allowNull: true
  },
  Writer: {
    type: Sequelize.STRING,
    validate: {len: [1,30]}, 
    allowNull: true
  },
  Password: {
    type: Sequelize.STRING,
    validate: {len: [8,14]}, 
    allowNull: true
  },
  View_count: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  Date: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW
  }
},
{
  freezeTableName: true, 
  timestamps: false
});



module.exports = Board;