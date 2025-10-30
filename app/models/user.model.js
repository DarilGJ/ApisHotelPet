module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        usertype: {
            type: Sequelize.ENUM('staff', 'customer'),
            allowNull: false
        },
        // Foreign keys para relacionar con Employee o Customer
        employeeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'employees',
                key: 'id'
            }
        },
        customerId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        lastLogin: {
            type: Sequelize.DATE
        }
    },
        {
            underscored: true
        }
    );

    return User;
}