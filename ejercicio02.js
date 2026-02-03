const playlist = [
  { titulo: "Bohemian Rhapsody", artista: "Queen", duracion: 354 },
  { titulo: "Imagine", artista: "John Lennon", duracion: 183 },
  { titulo: "Billie Jean", artista: "Michael Jackson", duracion: 294 },
  { titulo: "Shape of You", artista: "Ed Sheeran", duracion: 233 },
  { titulo: "Smells Like Teen Spirit", artista: "Nirvana", duracion: 301 },
  { titulo: "Hey Jude", artista: "The Beatles", duracion: 431 },
  { titulo: "Rolling in the Deep", artista: "Adele", duracion: 228 },
  { titulo: "Lose Yourself", artista: "Eminem", duracion: 326 },
  { titulo: "Hallelujah", artista: "Leonard Cohen", duracion: 283 },
  { titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", duracion: 356 }
];


const largas = playlist.filter(cancion => cancion.duracion > 180)
console.log(largas)

largas.map(cancion => console.log(`La canción ${cancion.titulo} dura ${cancion.duracion} segundos.`))