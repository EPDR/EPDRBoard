const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'dev', // 데이터베이스
  'gomja', // 유저 ID
  'rhawk1202:-)', // PASSWORD
  {
    'host': 'east-mariadb-dev.cpvfhejojors.ap-northeast-2.rds.amazonaws.com', // 데이터베이스 호스트
    'dialect': 'mysql' // 사용할 데이터베이스 종류
  }
);

sequelize.define('BOARD', {
  Seq: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Content: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Writer: {
    type: Sequelize.STRING,
    allowNull: true
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  View_count: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  Date: {
    type: Sequelize.DATE,
    allowNull: true
  }
});