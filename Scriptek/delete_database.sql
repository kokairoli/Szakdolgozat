SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'fitness-tracker';

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;
DROP TABLE IF EXISTS `exercise`;
DROP TABLE IF EXISTS `exercise_sequence`;
DROP TABLE IF EXISTS `exercise_set`;
DROP TABLE IF EXISTS `set_sequence`;


SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;