const quizContainer = document.getElementById('quiz-container');
const resultsSummary = document.getElementById('results-summary');
const startBtn = document.getElementById('start-quiz-btn');

let questions = [];
let currentIndex = 0;
let score = 0;


startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  fetch('questions.json')
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar preguntas");
      return response.json();
    })
    .then(data => {
      questions = data;
      currentIndex = 0;
      score = 0;
      resultsSummary.innerHTML = "";
      mostrarPreguntas();
    })
    .catch(error => {
      quizContainer.innerHTML = `<p>Error al cargar las preguntas: ${error.message}</p>`;
      console.error(error);
    });
});



function mostrarPreguntas() {
  const q = questions[currentIndex];
  if (!q) return;

  quizContainer.innerHTML = `
    <h2>Pregunta ${currentIndex + 1} de ${questions.length}</h2>
    <p>${q.text}</p>
    <form id="options-form">
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="answer" value="${opt.id}">
          ${opt.id}: ${opt.text}
        </label><br>
      `).join('')}
      <button type="submit">${currentIndex === questions.length - 1 ? "Finalizar" : "Siguiente"}</button>
    </form>
  `;

  const form = document.getElementById('options-form');
  form.addEventListener('submit', manejarRespuestas);
}



function manejarRespuestas(event) {
  event.preventDefault();

  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Selecciona una opción antes de continuar");
    return;
  }

  const q = questions[currentIndex];

  if (selected.value === q.correctAnswer) {
    score++;
  } else {

    q.userIncorrect = true;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    mostrarPreguntas();
  } else {
    mostrarResultados();
  }
}




function mostrarResultados() {
  quizContainer.innerHTML = "<h2>Quiz finalizado</h2>";
  resultsSummary.innerHTML = `
    <p>Puntuación: ${score} de ${questions.length}</p>
    ${questions.filter(q => q.userIncorrect).map(q => `
      <p><strong>Pregunta:</strong> ${q.text}<br>
      <strong>Respuesta correcta:</strong> ${q.correctAnswer}<br>
      <strong>Explicación:</strong> ${q.explanation}</p>
    `).join('')}
  `;
}
