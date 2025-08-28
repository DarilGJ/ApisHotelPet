module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        duration: {
            type: Sequelize.INTEGER, // duration in minutes
            allowNull: false
        },
        category: {
            type: Sequelize.ENUM('grooming', 'bath', 'deworming', 'specialNutrition', 'walk', 'veterinarian', 'massage', 'manicure', 'pedicure', 'other'),
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    }, {
        underscored: true
    });
    return Service;
};