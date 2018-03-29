module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    name:{
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Project.associate = function(models) {
    // in a many-to-many relationship, where an author can belong to many posts and vice versa, we will actually need a third table to store all of the possibilities. the "through" property will create that third table for us.
    Project.belongsToMany(models.User, {
      through: "user2project"
    });
  };

  Project.associate = function(models) {
    models.Project.hasMany(models.ToDo, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });
  };

  Project.associate = function(models) {
    models.Project.hasMany(models.Doing, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });
  };

  Project.associate = function(models) {
    models.Project.hasMany(models.Done, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });
  };

  return Project;
};
