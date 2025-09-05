module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define("pet", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        race: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        weight: {
            type: Sequelize.DECIMAL(3,2)
        },
        gender: {
            type: Sequelize.ENUM('Macho', 'Hembra'),
            allowNull: false
        },
        color: {
            type: Sequelize.STRING
        },
        observationMedical: {
            type: Sequelize.STRING
        },
        vaccinations: {
            type: Sequelize.STRING
        },
        allergies: {
            type: Sequelize.STRING,
        },
        behavior: {
            type: Sequelize.STRING
        },
        customer_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active',
            allowNull: false
        }
    }, {
        underscored: true
    });
    return Pet;
}