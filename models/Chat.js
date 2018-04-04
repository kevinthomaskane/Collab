module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    content:{
      type: DataTypes.TEXT
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false
    }
  });

  Chat.associate = function (models) {
    models.Chat.belongsTo(models.Project, {
      foreignKey: {
        onDelete: "CASCADE",
        name: "project_id",
        allowNull: false
      }
    });
  };

  return Chat;
};
