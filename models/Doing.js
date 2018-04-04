module.exports = function (sequelize, DataTypes) {
  var Doing = sequelize.define("Doing", {
    content:{
      type: DataTypes.TEXT
    }
  });

  Doing.associate = function(models) {
    models.Doing.belongsTo(models.Project, {
      foreignKey: {
        name: 'project_id',
        allowNull: false
      },
      onDelete: "CASCADE"
    });
  };

  return Doing;
};
