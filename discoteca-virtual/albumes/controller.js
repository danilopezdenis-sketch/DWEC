const albumModel = require("./album.model");
const artistaModel = require("../artista/artista.model");

exports.list = (req, res) => {
  const albumes = albumModel.getAll();
  const artistas = artistaModel.getAll();

  const albumesConArtista = albumes.map(a => ({
    ...a,
    artista: artistas.find(ar => ar.id === a.artistaId)
  }));

  res.render("album/list", { albumes: albumesConArtista });
};
