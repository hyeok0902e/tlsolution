/*
- name: 이름
- phone: 번호
- email: 이메일
- company: 회사명
- body: 기타 내용
*/ 
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('estimate',{
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
};