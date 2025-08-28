module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('room', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		number: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		type: {
			type: Sequelize.ENUM('single', 'double', 'suite'),
			allowNull: false
		},
		capacity: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		price: {
			type: Sequelize.DECIMAL(5, 2),
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		availability: {
			type: Sequelize.ENUM('available', 'occupied', 'maintenance'),
			defaultValue: 'available'
		}
	}, {
		underscored: true
	});
	return Room;
};