import { Router } from "express";
import { myController } from "../controllers/controller.js";

const router = Router();

router.get("/posts", myController.getAllPosts);
router.get("/posts/:id", myController.getPost);
router.post("/posts", myController.createPost);
router.put("/posts/like/:id", myController.putPost);
router.delete("/posts/:id", myController.erasePost);

export default router;
