import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "likeme",
	password: "root",
	allowExitOnIdle: true,
});

export const getPosts = async () => {
	const { rows } = await pool.query(
		"SELECT id, titulo, img, descripcion, likes  FROM posts"
	);
	return rows;
};

export const getPost = async (id) => {
	const post =
		"SELECT id, titulo, img, descripcion, likes FROM posts WHERE id = $1";
	const { rows } = await pool.query(post, [id]);
	if (rows.length === 0) {
		throw { code: "404" };
	}
	console.log(rows[0]);
	return rows[0];
};

export const createPost = async ({
	titulo,
	url,
	descripcion /* , likes */,
}) => {
	try {
		const postsQuery =
			"INSERT INTO posts (titulo, img, descripcion) values ($1, $2, $3) RETURNING *";
		await pool.query(postsQuery, [titulo, url, descripcion]);
	} catch (error) {
		console.error(error);
	}
};

export const deletePost = async (id) => {
	const deleteQ = "DELETE FROM posts WHERE id = $1";
	const { rows } = await pool.query(deleteQ, [id]);
	return rows;
};
