import { Album } from "../models/album.model.js";

export const getAllAlbum = async (req, res) => {
  const albums = await Album.find();
  res.status(200).json(albums);
};
export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs");
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};
