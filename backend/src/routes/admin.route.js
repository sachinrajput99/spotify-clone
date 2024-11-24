import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
} from "../controller/admin.controller.js";
import { deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin); //all the route below are authenticated and can only be used by admin

router.get("/check", checkAdmin);//check if a person is admin or not
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
