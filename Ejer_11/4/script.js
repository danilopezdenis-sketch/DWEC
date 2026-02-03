<<<<<<< HEAD
const userWidget = document.getElementById('user-widget');
const postsWidget = document.getElementById('posts-widget');
const spinner = document.getElementById('loading-spinner');

const userUrl = 'https://jsonplaceholder.typicode.com/users/1';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';




Promise.allSettled([fetch(userUrl), fetch(postsUrl)])
  .then(results => {
    spinner.style.display = 'none'; 

    const [userResult, postsResult] = results;

 

    if (userResult.status === 'fulfilled' && userResult.value.ok) {
      userResult.value.json().then(user => {
        userWidget.innerHTML = `
          <h2>Información del Usuario</h2>
          <p><strong>Nombre:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Teléfono:</strong> ${user.phone}</p>
          <p><strong>Compañía:</strong> ${user.company.name}</p>
          <p><strong>Ciudad:</strong> ${user.address.city}</p>
        `;
      }).catch(err => {
        userWidget.innerHTML = `<p>Error al procesar datos del usuario</p>`;
        console.error(err);
      });
    } else {
      userWidget.innerHTML = `<p>Error al cargar datos del usuario</p>`;
      if (userResult.reason) console.error(userResult.reason);
    }

   
    


    if (postsResult.status === 'fulfilled' && postsResult.value.ok) {
      postsResult.value.json().then(posts => {


        const lastThreePosts = posts.slice(-3).reverse();
        postsWidget.innerHTML = '<h2>Últimos 3 Posts</h2>';
        lastThreePosts.forEach(post => {
          const div = document.createElement('div');
          div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
          postsWidget.appendChild(div);
        });
      }).catch(err => {
        postsWidget.innerHTML = `<p>Error al procesar posts</p>`;
        console.error(err);
      });
    } else {
      postsWidget.innerHTML = `<p>Error al cargar posts</p>`;
      if (postsResult.reason) console.error(postsResult.reason);
    }

    


    if ((userResult.status !== 'fulfilled' || !userResult.value.ok) &&
        (postsResult.status !== 'fulfilled' || !postsResult.value.ok)) {
      spinner.style.display = 'block';
      spinner.textContent = 'Error al cargar todos los datos.';
    }
  })
  .catch(err => {
    spinner.style.display = 'block';
    spinner.textContent = 'Error inesperado al cargar datos.';
    console.error(err);
  });
=======
const userWidget = document.getElementById('user-widget');
const postsWidget = document.getElementById('posts-widget');
const spinner = document.getElementById('loading-spinner');

const userUrl = 'https://jsonplaceholder.typicode.com/users/1';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';




Promise.allSettled([fetch(userUrl), fetch(postsUrl)])
  .then(results => {
    spinner.style.display = 'none'; 

    const [userResult, postsResult] = results;

 

    if (userResult.status === 'fulfilled' && userResult.value.ok) {
      userResult.value.json().then(user => {
        userWidget.innerHTML = `
          <h2>Información del Usuario</h2>
          <p><strong>Nombre:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Teléfono:</strong> ${user.phone}</p>
          <p><strong>Compañía:</strong> ${user.company.name}</p>
          <p><strong>Ciudad:</strong> ${user.address.city}</p>
        `;
      }).catch(err => {
        userWidget.innerHTML = `<p>Error al procesar datos del usuario</p>`;
        console.error(err);
      });
    } else {
      userWidget.innerHTML = `<p>Error al cargar datos del usuario</p>`;
      if (userResult.reason) console.error(userResult.reason);
    }

   
    


    if (postsResult.status === 'fulfilled' && postsResult.value.ok) {
      postsResult.value.json().then(posts => {


        const lastThreePosts = posts.slice(-3).reverse();
        postsWidget.innerHTML = '<h2>Últimos 3 Posts</h2>';
        lastThreePosts.forEach(post => {
          const div = document.createElement('div');
          div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
          postsWidget.appendChild(div);
        });
      }).catch(err => {
        postsWidget.innerHTML = `<p>Error al procesar posts</p>`;
        console.error(err);
      });
    } else {
      postsWidget.innerHTML = `<p>Error al cargar posts</p>`;
      if (postsResult.reason) console.error(postsResult.reason);
    }

    


    if ((userResult.status !== 'fulfilled' || !userResult.value.ok) &&
        (postsResult.status !== 'fulfilled' || !postsResult.value.ok)) {
      spinner.style.display = 'block';
      spinner.textContent = 'Error al cargar todos los datos.';
    }
  })
  .catch(err => {
    spinner.style.display = 'block';
    spinner.textContent = 'Error inesperado al cargar datos.';
    console.error(err);
  });
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
