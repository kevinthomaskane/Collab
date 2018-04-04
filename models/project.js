module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Project.associate = function(models) {
    var User = models.User
    Project.belongsToMany(User, {
      through: "UserProject",
      foreignKey: "projectId"
    });
    models.Project.hasMany(models.ToDo, {
      foreignKey: {
        name: 'project_id',
        allowNull: false
      },
    });
    models.Project.hasMany(models.Doing, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });
    models.Project.hasMany(models.Done, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });

    models.Project.hasMany(models.Chat, {
      foreignKey: {
        onDelete: "CASCADE",
        name: "project_id",
        allowNull: false
      }
    });
  };

  return Project;
};
