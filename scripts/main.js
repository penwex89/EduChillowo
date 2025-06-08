// main.js - Lógica principal de EduChill
// Seguridad: usar IIFE para evitar variables globales
(function() {
  // Idioma actual ('es' o 'en')
  let currentLang = 'es';

  // Renderizar lecciones desde window.LESSONS
  function renderLessons() {
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';
    window.LESSONS.forEach(lesson => {
      const section = document.createElement('section');
      section.className = 'lesson';
      section.id = lesson.id;
      // Título bilingüe
      const h2 = document.createElement('h2');
      h2.setAttribute('data-es', lesson.title.es);
      h2.setAttribute('data-en', lesson.title.en);
      h2.textContent = lesson.title[currentLang];
      section.appendChild(h2);
      // Lista de items
      const ul = document.createElement('ul');
      lesson.items.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('data-es', item.es);
        li.setAttribute('data-en', item.en);
        li.textContent = item[currentLang];
        ul.appendChild(li);
      });
      section.appendChild(ul);
      container.appendChild(section);
    });
  }

  // Cambia todos los textos con data-en/data-es
  function switchLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLang;
    // Cambia textos de los elementos con data-en/data-es
    document.querySelectorAll('[data-en]').forEach(el => {
      // Si el elemento es input, cambia el placeholder
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.placeholder = el.getAttribute('data-' + currentLang);
      } else {
        el.textContent = el.getAttribute('data-' + currentLang);
      }
    });
    // Cambia el texto del botón de idioma
    document.getElementById('lang-toggle').textContent = currentLang === 'es' ? 'EN' : 'ES';
    // Cambia el subtítulo
    document.getElementById('site-desc').textContent =
      currentLang === 'es' ? 'Aprende relajado: inglés, matemáticas y lógica de programación' :
      'Learn relaxed: English, math and programming logic';
    // Volver a renderizar lecciones para actualizar idioma
    renderLessons();
  }

  // Inicializar
  document.addEventListener('DOMContentLoaded', function() {
    renderLessons();
    document.getElementById('lang-toggle').addEventListener('click', switchLanguage);
  });

  // Control de música de fondo: ocultar/mostrar el iframe
  const musicFrame = document.getElementById('lofi-music');
  const musicToggle = document.getElementById('music-toggle');
  let musicVisible = true;

  function toggleMusic() {
    if (musicVisible) {
      musicFrame.style.display = 'none';
      musicToggle.textContent = '🔇';
    } else {
      musicFrame.style.display = '';
      musicToggle.textContent = '🔊';
    }
    musicVisible = !musicVisible;
  }

  musicToggle.addEventListener('click', toggleMusic);

  // Preparar para cargar lecciones desde archivo externo
  window.EduChill = { switchLanguage };
})(); 