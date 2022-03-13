import sqlite from "sqlite3"
import path from "path"
const sqlite3 = sqlite.verbose()

import { CREATE_TABLES, TABLE_NAMES } from "../sql/userTables"

const db_name = path.join(__dirname, "../../data", "database.db")

export const db = new sqlite3.Database(db_name, err => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Successful connection to the database 'database.db'");
});

export default class {
	static restartDB() {
		db.serialize(() => {
			TABLE_NAMES.forEach(name => db_delete(name))
			CREATE_TABLES.forEach(stmt => db_run(stmt))
		})
	}

	static startDB() {
		db.serialize(() => {
			CREATE_TABLES.forEach(stmt => db_run(stmt))
		})
	}

	static get(stmt: string, params: any | any[]) {
		return new Promise((res, rej) => {
			db.get(stmt, params, (err, result) => {
				if (err) {
					return rej(err.message)
				}
				return res(result)
			})
		})
	}

	static all(stmt: string, params: any) {
		return new Promise((res, rej) => {
			db.all(stmt, params, (err, result) => {
				if (err) {
					return rej(err.message);
				}
				return res(result);
			});
		})
	}

	static run(stmt: string, params: any) {
		console.log("DBM running", stmt, params)
		return new Promise((res, rej) => {
			db.run(stmt, params, (err, result) => {
				if (err) {
					return rej(err.message)
				}
				return res(result)
			})
		})
	}
}

const db_run = (cmd: string) => {
	db.run(cmd, err => {
		if (err) {
			return console.error(err.message);
		}
	});
}

const db_delete = (table_name: string) => {
	db_run(`DROP TABLE IF EXISTS ${table_name}`)
	console.log("dropped table")
}
