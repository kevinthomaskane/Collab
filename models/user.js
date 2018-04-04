module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    }
  });

  User.associate = function(models) {
    var Project = models.Project
    User.belongsToMany(Project, {
      through: "UserProject",
      foreignKey: "userId"
    });
  };
  return User;
};
