module.exports = function (sequelize, DataTypes) {
  var Done = sequelize.define("Done", {
    content:{
      type: DataTypes.TEXT
    }
  });

  Done.associate = function(models) {
    models.Done.belongsTo(models.Project, {
      foreignKey: {
        onDelete: "CASCADE",
        name: 'project_id',
        allowNull: false
      }
    });
  };

  return Done;
};
