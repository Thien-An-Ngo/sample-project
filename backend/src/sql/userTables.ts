export const CREATE_TABLES = [
	`CREATE TABLE IF NOT EXISTS User(
        id VARCHAR(128) PRIMARY KEY,
        username VARCHAR(64) NOT NULL UNIQUE,
        name VARCHAR(64) NOT NULL,
        surname VARCHAR(64) NOT NULL,
        password VARCHAR(64) NOT NULL
	 )`
]

export const TABLE_NAMES = ['User']