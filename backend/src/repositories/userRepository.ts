import dbService from '../services/databaseService';
import User from '../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'});

const saltRounds: number = parseInt(<string>process.env.SALT_ROUNDS) || 7;

export default class {
	static async getAllUsers(): Promise<User[]> {
		const users = await dbService.all('SELECT * FROM User', []);
		return <User[]>users;
	}

	/** @param id string that is used to find the user */
	static async getUserById(id: string): Promise<User> {
		const user = await dbService.get("SELECT * FROM User WHERE id = $id", {$id: id})
		return <User>user
	}

	/** @param username string that is used to find the user */
	static async getUserByUsername(username: string): Promise<User> {
		const user = await dbService.get("SELECT * FROM User WHERE username = $username", {
			$username: username
		})
		return <User>user
	}

	static async add(user: User): Promise<boolean> {
		await bcrypt.hash(user.password, saltRounds, async function (err, hash) {
			if (err) {
				return false;
			}
			const stmt =
				'INSERT INTO User(id,username,name,surname,password) VALUES($id,$username,$name,$surname,$password)'
			try {
				await dbService.run(stmt, {
					$id: user.id,
					$username: user.username,
					$name: user.name,
					$surname: user.surname,
					$password: hash,
				});
				return true;
			} catch (ex) {
				console.error(ex);
				return false;
			}
		});
		return true;
	}

	static async exists(column: string, value: string): Promise<boolean> {
		const res: object = <object>(
			await dbService.get(
				`SELECT EXISTS(SELECT 1 FROM User WHERE ${column} = $value)`,
				{$value: value}
			)
		);
		let doesExist;
		for (const key in res) {
			doesExist = res[key];
		}
		return doesExist === 1;
	}

	static async updateUser(user: User): Promise<boolean> {
		const stmt = `
            UPDATE User
            SET username = $username,
                name     = $name,
                surname  = $surname
            WHERE id = $id
		`;
		try {
			await dbService.run(stmt, {
				$id: user.id,
				$username: user.username,
				$name: user.name,
				$surname: user.surname,
			});
			console.log('Updating User');
			return true;
		} catch (err) {
			console.log(err);
		}
		return false;
	}

	static async delete(userId: number): Promise<boolean> {
		const stmt = 'DELETE FROM User WHERE id = $id';
		try {
			await dbService.run(stmt, {$id: userId});
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
}