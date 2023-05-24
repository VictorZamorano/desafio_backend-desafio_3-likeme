import express from "express";
import cors from "cors";

import { createPost, getPosts, getPost, deletePost } from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ ok: true });
});

app.get("/posts", async (req, res) => {
	try {
		const result = await getPosts();
		res.json({ ok: true, result });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ ok: false, result: "Error de servidor" });
	}
});

app.get("/posts/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getPost(id);
		res.json({ ok: true, result });
	} catch (error) {
		console.log(error);
		return res
			.status(404)
			.json({ ok: false, result: "Error de servidor, ID inexistente" });
	}
});

app.post("/posts", async (req, res) => {
	const { titulo, url, descripcion } = req.body;
	if (!titulo || !url || !descripcion) {
		return res
			.status(400)
			.json({ ok: false, result: "Debes llenar todos los campos" });
	}
	try {
		const result = await createPost({ titulo, url, descripcion });
		res.status(201).json({ ok: true, result });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ ok: false, result: "Error en servidor, createPost" });
		return;
	}
});

app.delete("/posts/:id", async (req, res) => {
	const { id } = req.params;

	try {
		deletePost(id);
		res.status(200).json({
			ok: true,
			result: "Post eliminado con exíto",
		});
	} catch (error) {
		console.log(error);
		res.json({ ok: false, result: `Post ${id} NO se a eliminado` });
	}
});

app.listen(3000, () => {
	console.log("SERVER ON", "http://localhost:3000");
});
/* ================================================================================================ */
/* Este PUT unicamente lo deje para que no enviare error con axios, por ahora no esta funcionando */
app.put("/posts/like/:id", async (req, res) => {
	const { id } = req.params;
	//const { likes } = req.body;
	try {
		const result = await getPost(id);
		res.status(200).json({ ok: true, result });
	} catch (error) {
		console.log(error);
	}
});
/* Este PUT unicamente lo deje para que no enviare error con axios, por ahora no esta funcionando */
