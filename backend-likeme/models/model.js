import { pool } from "../db/connections.js";

const setAllPosts = async () => {
	try {
		const { rows } = await pool.query(
			"SELECT id, titulo, img, descripcion, likes FROM posts"
		);
		return rows;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const setPost = async (id) => {
	const post =
		"SELECT id, titulo, img, descripcion, likes FROM posts WHERE id = $1";

	try {
		const { rows } = await pool.query(post, [id]);
		if (rows.length === 0) {
			throw { code: "404" };
		}
		console.log(rows[0]);
		return rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const insertPost = async ({ titulo, url, descripcion }) => {
	try {
		if (!titulo || !url || !descripcion) {
			throw { code: "400" };
		}
		const postsQuery =
			"INSERT INTO posts (titulo, img, descripcion) values ($1, $2, $3) RETURNING *";
		const values = [titulo, url, descripcion];
		const { rows } = await pool.query(postsQuery, values);
		return rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const updateLike = async (id) => {
	const query = "SELECT id, likes FROM posts WHERE id = $1";
	try {
		const values = [id];
		const { rows } = await pool.query(query, values);
		const selectResult = rows;
		if (!id) {
			throw { code: "404" };
		}
		if (selectResult.length > 0) {
			const likeQuery = "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *";
			const setLike =
				selectResult[0].likes === 0 ? 1 : selectResult[0].likes + 1;
			const updateValues = [setLike, id];
			const { rows } = await pool.query(likeQuery, updateValues);
			return rows[0];
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const deletePost = async (id) => {
	const deleteQ = "DELETE FROM posts WHERE id = $1";

	try {
		const { rows, rowCount } = await pool.query(deleteQ, [id]);
		if (rowCount === 0) {
			throw { code: "404" };
		}
		return rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const myModel = {
	setAllPosts,
	setPost,
	insertPost,
	updateLike,
	deletePost,
};
