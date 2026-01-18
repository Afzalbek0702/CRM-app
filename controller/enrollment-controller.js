import pool from "../lib/db.js";
class EnrollmentController {
	async getAllEnrollments(req, res) {
		try {
			const { rows } = await pool.query("SELECT * FROM enrollments");
			res.json(rows);
		} catch (error) {
			res
				.status(500)
				.json({ msg: "Enrollmentsni olishda xatolik yuz berdi", error });
		}
	}
	async createEnrollment(req, res) {
		const { student_id, group_id } = req.body;
		if (!student_id || !group_id) {
			return res.status(400).json({ error: "student_id va group_id majburiy" });
		}
		try {
			const { rows } = await pool.query(
				"INSERT INTO enrollments (student_id, group_id) VALUES ($1, $2) RETURNING *",
				[student_id, group_id]
			);
			res.json(rows[0]);
		} catch (error) {
			res
				.status(500)
				.json({ msg: "Enrollment qo'shishda xatolik yuz berdi", error });
		}
	}
}
export default new EnrollmentController();
