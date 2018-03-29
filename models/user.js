module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name:{
      type:DataTypes.STRING,
      allowNull: false
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.belongsToMany(models.Project, {
      through: "user2project"
    });
  };

  return User;
};
