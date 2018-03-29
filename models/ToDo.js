module.exports = function (sequelize, DataTypes) {
  var ToDo = sequelize.define("ToDo", {
    content:{
      type: DataTypes.TEXT
    }
  });

  ToDo.associate = function(models) {
    models.ToDo.belongsTo(models.Project, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });
  };

  return ToDo;
};
