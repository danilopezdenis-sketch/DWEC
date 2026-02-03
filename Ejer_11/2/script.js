<<<<<<< HEAD


var xhr = new XMLHttpRequest();
xhr.open("GET", "comments_initial.json", true); 

xhr.onload = function() {
  if (xhr.status === 200) {
    var comentarios = JSON.parse(xhr.responseText);
    renderComments(comentarios);
  } else {
    console.error("Error al cargar comentarios iniciales:", xhr.status);
  }
};

xhr.onerror = function() {
  console.error("Error de red al cargar comentarios iniciales");
};

xhr.send();


function renderComments(commentsArray) {
  const commentsList = document.getElementById('comments-list');
  commentsList.innerHTML = ""; 
  commentsArray.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = `${comment.author} [${comment.timestamp}]: ${comment.commentText}`;
    commentsList.appendChild(li);
  });
}


const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', function(e) {
  e.preventDefault(); 

  const author = document.getElementById('author').value.trim();
  const commentText = document.getElementById('commentText').value.trim();

  if (!author || !commentText) return;

  const newComment = {
    author: author,
    commentText: commentText,
    timestamp: new Date().toISOString()
  };

  const boton = commentForm.querySelector('button[type="submit"]');
  boton.disabled = true; 

 

  var xhrPost = new XMLHttpRequest();
  xhrPost.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/TU-ID", true);
  xhrPost.setRequestHeader("Content-Type", "application/json");

  xhrPost.onload = function() {
    if (xhrPost.status >= 200 && xhrPost.status < 300) {
      console.log("Comentario enviado con éxito");

      const commentsList = document.getElementById('comments-list');
      const li = document.createElement('li');
      li.textContent = `${newComment.author} [${newComment.timestamp}]: ${newComment.commentText}`;
      commentsList.appendChild(li);

      commentForm.reset(); 
    } else {
      console.error("Error al enviar comentario:", xhrPost.status);
      alert("Error al enviar comentario");
    }
    boton.disabled = false;
  };

  xhrPost.onerror = function() {
    console.error("Error de red al enviar comentario");
    alert("Error de red al enviar comentario");
    boton.disabled = false;
  };

  xhrPost.send(JSON.stringify(newComment));
});
=======


var xhr = new XMLHttpRequest();
xhr.open("GET", "comments_initial.json", true); 

xhr.onload = function() {
  if (xhr.status === 200) {
    var comentarios = JSON.parse(xhr.responseText);
    renderComments(comentarios);
  } else {
    console.error("Error al cargar comentarios iniciales:", xhr.status);
  }
};

xhr.onerror = function() {
  console.error("Error de red al cargar comentarios iniciales");
};

xhr.send();


function renderComments(commentsArray) {
  const commentsList = document.getElementById('comments-list');
  commentsList.innerHTML = ""; 
  commentsArray.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = `${comment.author} [${comment.timestamp}]: ${comment.commentText}`;
    commentsList.appendChild(li);
  });
}


const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', function(e) {
  e.preventDefault(); 

  const author = document.getElementById('author').value.trim();
  const commentText = document.getElementById('commentText').value.trim();

  if (!author || !commentText) return;

  const newComment = {
    author: author,
    commentText: commentText,
    timestamp: new Date().toISOString()
  };

  const boton = commentForm.querySelector('button[type="submit"]');
  boton.disabled = true; 

 

  var xhrPost = new XMLHttpRequest();
  xhrPost.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/TU-ID", true);
  xhrPost.setRequestHeader("Content-Type", "application/json");

  xhrPost.onload = function() {
    if (xhrPost.status >= 200 && xhrPost.status < 300) {
      console.log("Comentario enviado con éxito");

      const commentsList = document.getElementById('comments-list');
      const li = document.createElement('li');
      li.textContent = `${newComment.author} [${newComment.timestamp}]: ${newComment.commentText}`;
      commentsList.appendChild(li);

      commentForm.reset(); 
    } else {
      console.error("Error al enviar comentario:", xhrPost.status);
      alert("Error al enviar comentario");
    }
    boton.disabled = false;
  };

  xhrPost.onerror = function() {
    console.error("Error de red al enviar comentario");
    alert("Error de red al enviar comentario");
    boton.disabled = false;
  };

  xhrPost.send(JSON.stringify(newComment));
});
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
