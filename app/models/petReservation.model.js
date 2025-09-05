module.exports = (sequelize, Sequelize) => {
    const PetReservation = sequelize.define('petReservation', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reserveId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'reserves',
                key: 'id'
            }
        },
        petId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id'
            }
        }
    }, {
        underscored: true
    });
    return PetReservation;
};