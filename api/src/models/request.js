/* eslint new-cap: 0 */
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'member_id',
    },
    labelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'label_id',
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'refused'),
      allowNull: false,
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    tableName: 'requests',
    timestamps: true,
    underscored: true,
    instanceMethods: {
      accept() {
        return new Promise(resolve => {
          this.update({status: 'accepted'}).then(() => {
            const LabelStatus = sequelize.models.LabelStatus;
            LabelStatus.count({
              where: {userId: this.memberId},
            }).then(count => {
              LabelStatus.create({
                userId: this.memberId,
                labelId: this.labelId,
                priority: count,
                visibled: true,
              });
              resolve();
            });
          });
        });
      },
    },
  });

  return Request;
};
