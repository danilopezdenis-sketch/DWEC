const artistaModel = require("./artista.model");
const albumModel = require("../album/album.model");

exports.list = (req, res) => {
  res.render("artista/list", {
    artistas: artistaModel.getAll()
  });
};

exports.detail = (req, res) => {
  const artista = artistaModel.getById(req.params.id);
  const albumes = albumModel.getByArtist(req.params.id);

  res.render("artista/detail", { artista, albumes });
};
