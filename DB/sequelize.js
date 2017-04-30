const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'DEV', // 데이터베이스
  'gomja', // 유저 ID
  'rhawk1202:-)', // PASSWORD
  {
    'host': 'east-mariadb-dev.cpvfhejojors.ap-northeast-2.rds.amazonaws.com', // 데이터베이스 호스트
    'dialect': 'mysql' ,// 사용할 데이터베이스 종류
    'port' : '3306'
  }
);


module.exports = sequelize;