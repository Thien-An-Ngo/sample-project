export const CREATE_TABLES = [
	`CREATE TABLE IF NOT EXISTS User(
        id VARCHAR(128) PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        surname VARCHAR(64) NOT NULL,
        username VARCHAR(64) NOT NULL UNIQUE,
        password VARCHAR(64) NOT NULL,
        key VARCHAR(32) UNIQUE,
        key_time INTEGER
	 )`,
	`CREATE INDEX idx_user_username ON User(username)`
]

export const TABLE_NAMES = ['User']