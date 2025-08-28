module.exports = (sequelize, Sequelize) => {
    const Reserve = sequelize.define('reserve', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        checkInDate: {
            type: Sequelize.DATE
        },
        checkOutDate: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('pending', 'confirmed', 'inProgress', 'completed', 'canceled'),
            defaultValue: 'pending'
        },
        observation: {
            type: Sequelize.TEXT
        },
        subTotal: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        iva: {
            type: Sequelize.DECIMAL(5, 2)
        },
        total: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        roomId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'rooms',
                key: 'id'
            }
        },
        employeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'employees',
                key: 'id'
            }
        }
    }, {
        underscored: true
    });
    return Reserve;
};