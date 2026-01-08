import {Router } from "express";
import { 
    getAllPosts, 
    createPost, 
    getPostBySlug, 
    updatePost, 
    deletePost, 
    publishPost, 
    unpublishPost 
} from "../controllers/posts.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

// public routes
router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);

// protected routes
router.post("/", verifyJWT, createPost);
router.put("/:id", verifyJWT, updatePost);
router.delete("/:id", verifyJWT, deletePost);
router.put("/:id/publish", verifyJWT, publishPost);
router.put("/:id/unpublish", verifyJWT, unpublishPost);


export default router;