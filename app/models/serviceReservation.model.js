module.exports = (sequelize, Sequelize) => {
    const ServiceReservation = sequelize.define('serviceReservation', {
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
        serviceId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        unitPrice: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        subTotal: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        dateService: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('completed', 'cancelled'),
            defaultValue: 'completed'
        }
    }, {
        underscored: true
    });
    return ServiceReservation;
};