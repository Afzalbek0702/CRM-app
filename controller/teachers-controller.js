import pool from "../lib/db.js";

class Teachers_Controller {
	async getAllTeachers(req, res) {
		try {
			const { rows } = await pool.query("SELECT * FROM teachers;");
			res.json(rows);
		} catch (error) {
			res
				.status(500)
				.json({ msg: "O'qituvchilarni olishda xatolik yuz berdi", error });
		}
	}
	async postTeacher(req, res) {
		const { full_name, phone } = req.body;
		if (!full_name || !phone) {
			return res.status(401).send({ error: "To'liq ma'lumot kiriting" });
		}
		try {
			const { rows } = await pool.query(
				"INSERT INTO teachers (full_name, phone) VALUES ($1, $2) RETURNING *",
				[full_name, phone]
			);
			res.json(rows[0]);
		} catch (error) {
			res
				.status(500)
				.json({ msg: "O'qituvchilarni qo'shishda xatolik yuz berdi", error });
		}
	}
	async getTeacherById(req, res) {
		if (!req.params.id) {
			return res.status(401).send({ error: "ID kiriting" });
		}
		try {
			const { rows } = await pool.query(
				"SELECT * FROM teachers WHERE id = $1;",
				[req.params.id]
			);
			res.json(rows[0]);
		} catch (error) {
			res.status(500).json({ msg: "O'qituvchini olishda xatolik yuz berdi", error });
		}
	}
	async updateTeacher(req, res) {
		if (!req.params.id) {
			res.status(401).send({ error: "ID kiriting" });
		}
		const { full_name, phone } = req.body;
		if (!full_name || !phone) {
			return res.status(401).send({ error: "To'liq ma'lumot kiriting" });
		}
		try {
			const { rows } = await pool.query(
				"UPDATE teachers SET full_name = $1, phone = $2 WHERE id = $3 RETURNING *;",
				[full_name, phone, req.params.id]
			);
			res.json(rows[0]);
		} catch (error) {
			res
				.status(500)
				.json({ msg: "O'qituvchilarni yangilashda xatolik yuz berdi", error });
		}
	}
	async deleteTeacher(req, res) {
		if (!req.params.id) {
			res.status(401).send({ error: "ID kiriting" });
		}
		try {
			await pool.query("DELETE FROM teachers WHERE id = $1;", [req.params.id]);
			res.json({ message: "Teacher deleted successfully" });
		} catch (error) {
			res
				.status(500)
				.json({ msg: "O'qituvchini o'chirishda xatolik yuz berdi", error });
		}
	}
}
export default new Teachers_Controller();