import pool from "../lib/db.js";

class userController {
	async getUsers(req, res) {
		const result = await pool.query(
			`SELECT id, full_name, email, role
     FROM users
     ORDER BY created_at DESC`,
		);

		res.json(result.rows);
	}
	async updateUserRole(req, res) {
		const { role } = req.body;

		await pool.query("UPDATE users SET role = $1 WHERE id = $2", [
			role,
			req.params.id,
		]);

		res.json({ message: "Role updated" });
	}
	async deleteUser(req, res) {
		await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);

		res.json({ message: "User deleted" });
	}
}
export default new userController();