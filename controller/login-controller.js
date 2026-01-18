import pool from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class loginController {
	async login(req, res) {
		const { username, password } = req.body;
		const user = await pool.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);
		if (!user.rows.length) {
			return res.status(401).json({ error: "Wrong credentials" });
		}

		const valid = await bcrypt.compare(password, user.rows[0].password_hash);

		if (!valid) {
			return res.status(401).json({ error: "Wrong credentials" });
		}

		const token = jwt.sign(
			{
				id: user.rows[0].id,
				role: user.rows[0].role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);
		res.json({
			token,
			user: {
				id: user.rows[0].id,
				full_name: user.rows[0].full_name,
				role: user.rows[0].role,
			},
		});
	}

	async register(req, res) {
		const { username, phone, password, role } = req.body;

		const hash = await bcrypt.hash(password, 10);

		const result = await pool.query(
			`INSERT INTO users (username, phone, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id, username, role`,
			[username, phone, hash, role],
		);

		res.status(201).json({
			message: "User created",
			user: result.rows[0],
		});
	}
}
export default new loginController();