import { handleErrors } from "../db/errors.js";
import { myModel } from "../models/model.js";

const get = async (req, res) => {
	res.json({ ok: true });
};

const getAllPosts = async (req, res) => {
	try {
		const result = await myModel.setAllPosts();
		res.json({ ok: true, message: "Posts agregados:", result });
	} catch (error) {
		console.log(error);
		const { status, message } = handleErrors(error.code);
		return res.status(status).json({ ok: false, result: message });
	}
};

const getPost = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await myModel.setPost(id);
		res.json({ ok: true, message: "Post existente:", result });
	} catch (error) {
		console.log(error);
		const { status, message } = handleErrors(error.code);
		return res.status(status).json({ ok: false, result: message });
	}
};

const createPost = async (req, res) => {
	const { titulo, url, descripcion } = req.body;
	try {
		const result = await myModel.insertPost({ titulo, url, descripcion });
		res
			.status(201)
			.json({ ok: true, message: "Post creado con exito: ", result });
	} catch (error) {
		console.log(error);
		const { status, message } = handleErrors(error.code);
		return res.status(status).json({ ok: false, result: message });
	}
};

const putPost = async (req, res) => {
	const { id } = req.params;
	try {
		const like = await myModel.updateLike(id);
		if (id != null) {
			res
				.status(200)
				.json({ ok: true, message: "Like agregado con exito", like });
		}
	} catch (error) {
		console.log(error);
		const { status, message } = handleErrors(error.code);
		return res.status(status).json({ ok: false, result: message });
	}
};

const erasePost = async (req, res) => {
	const { id } = req.params;
	try {
		await myModel.deletePost(id);
		res.status(200).json({
			ok: true,
			message: "Post eliminado con exíto",
		});
	} catch (error) {
		console.log(error);
		const { status, message } = handleErrors(error.code);
		return res.status(status).json({ ok: false, result: message });
	}
};
export const myController = {
	getAllPosts,
	getPost,
	createPost,
	putPost,
	erasePost,
	get,
};
