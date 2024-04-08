SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'fitness-tracker';

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `client`;
DROP TABLE IF EXISTS `client_seq`;
DROP TABLE IF EXISTS `coach`;
DROP TABLE IF EXISTS `coach_seq`;
DROP TABLE IF EXISTS `coaching_request`;
DROP TABLE IF EXISTS `coaching_sequence`;
DROP TABLE IF EXISTS `exercise`;
DROP TABLE IF EXISTS `exercise_sequence`;
DROP TABLE IF EXISTS `exercise_set`;
DROP TABLE IF EXISTS `set_sequence`;
DROP TABLE IF EXISTS `weight`;
DROP TABLE IF EXISTS `weight_sequence`;
DROP TABLE IF EXISTS `workout`;
DROP TABLE IF EXISTS `workout_sequence`;





SET FOREIGN_KEY_CHECKS = 1;