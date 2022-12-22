module.exports = {
  up: 'CREATE TABLE videos (' +
      'id int NOT NULL AUTO_INCREMENT, ' +
      'uuid VARCHAR(36) NOT NULL, ' +
      'name VARCHAR(255) NOT NULL, ' +
      'created_at VARCHAR(50) NOT NULL, ' +
      'updated_at VARCHAR(50) DEFAULT NULL, ' +
      'deleted_at VARCHAR(50) DEFAULT NULL, ' +
      'status VARCHAR(50) NOT NULL, ' +
      'url TEXT, ' +
      'PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;',
  down: 'DROP TABLE videos',
};