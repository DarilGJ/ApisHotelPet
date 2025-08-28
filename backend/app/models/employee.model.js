module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        position: {
            type: Sequelize.ENUM('Manager', 'receptionist', 'janitors', 'petSitter', 'veterinary', 'logistics', 'finance', 'HHRR'),
        },
        salary: {
            type: Sequelize.DECIMAL(5, 2),
        },
        hiringDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    },{
        underscored: true
    });
    return Employee;
}