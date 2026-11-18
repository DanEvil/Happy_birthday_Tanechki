const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const links = document.querySelectorAll('.header__list-link');

function openLightbox(src, title) {
  lightboxImage.src = src;
  lightboxImage.alt = title || '';
  lightboxTitle.textContent = title || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // очищаем src после анимации, чтобы не мигало
  setTimeout(() => { lightboxImage.src = ''; }, 350);
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const src = link.dataset.image;
    if (!src) return;
    openLightbox(src, link.dataset.title);
  });
});

// закрытие: клик по фону или крестику
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeLightbox);
});

// закрытие по Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});


document.querySelector("#another-gift")?.addEventListener("click", (event) => {
  event.preventDefault();

  const burst = document.createElement("div");
  burst.className = "balloon-burst";
  burst.setAttribute("aria-hidden", "true");
  document.body.appendChild(burst);

  function launchParty() {
    for (let i = 0; i < 25; i++) {
      const balloon = document.createElement("span");
      balloon.className = "balloon";
      balloon.style.setProperty("--left", `${Math.random() * 100}%`);
      balloon.style.setProperty("--size", `${65 + Math.random() * 45}px`);
      balloon.style.setProperty("--delay", `${Math.random() * 1.2}s`);
      balloon.style.setProperty("--duration", `${6 + Math.random() * 2}s`);
      burst.appendChild(balloon);
    }
  }

  launchParty();                  // первая партия
  setTimeout(launchParty, 5000); // вторая партия через 5 секунд

  setTimeout(() => burst.remove(), 16000);
});

document.querySelector("#scroll-to-beginning")?.addEventListener("click", () => {
  document.querySelector("#beginning")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});













(() => {
  const photos = [
    "img/2.5.1.jpg",
    "img/2.5.2.jpg",
    "img/2.5.3.jpg",
    "img/2.5.4.jpg",
    "img/2.5.5.jpg",
    "img/2.5.6.jpg"
    
  ];

  const openButton = document.querySelector("#open-memory-gallery");
  const lightbox = document.querySelector("#lightbox");
  const image = document.querySelector("#lightboxImage");
  const title = document.querySelector("#lightboxTitle");
  const counter = document.querySelector("#memory-counter");
  const prevButton = document.querySelector("#memory-prev");
  const nextButton = document.querySelector("#memory-next");

  if (!openButton || !lightbox || !image || !title || !counter) return;

  let current = 0;
  let timer;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    image.src = photos[current];
    image.alt = `Фотография ${current + 1}`;
    counter.textContent = `${current + 1} из ${photos.length}`;
  }

  function stopSlideshow() {
    clearInterval(timer);
    timer = undefined;
  }

  function startSlideshow() {
    stopSlideshow();
    timer = setInterval(() => {
      if (!lightbox.classList.contains("is-open")) {
        stopSlideshow();
        return;
      }
      showPhoto(current + 1);
    }, 3000);
  }

  openButton.addEventListener("click", () => {
    showPhoto(0);
    if (prevButton) prevButton.hidden = false;
if (nextButton) nextButton.hidden = false;
if (counter) counter.hidden = false;

    title.textContent = "Наши фотографии";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    startSlideshow();
  });

  prevButton?.addEventListener("click", () => {
    showPhoto(current - 1);
    startSlideshow();
  });

  nextButton?.addEventListener("click", () => {
    showPhoto(current + 1);
    startSlideshow();
  });

  lightbox.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", stopSlideshow);
  });

  document.querySelectorAll(".header__list-link[data-image]").forEach((link) => {
  link.addEventListener("click", () => {
    stopSlideshow();
    if (prevButton) prevButton.hidden = true;
    if (nextButton) nextButton.hidden = true;
    if (counter) counter.hidden = true;
  });
});

})();


document.querySelector("#parents-heart")?.addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const heart = document.createElement("span");

  heart.className = "floating-heart";
  heart.textContent = "♥";
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
 heart.style.setProperty("--drift", `${Math.random() * 70 - 35}px`);

  document.body.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
});












document.querySelector("#back-to-top")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});





(() => {
  const videoButton = document.querySelector("#show-video");
  const lightbox = document.querySelector("#lightbox");
  const video = document.querySelector("#lightboxVideo");
  const photoGallery = document.querySelector(".memory-gallery");
  const counter = document.querySelector("#memory-counter");
  const title = document.querySelector("#lightboxTitle");

  if (!videoButton || !lightbox || !video || !title) {
    console.error("Не найдены кнопка видео, lightbox или видеоплеер.");
    return;
  }

  videoButton.addEventListener("click", () => {
    if (photoGallery) photoGallery.hidden = true;
    if (counter) counter.hidden = true;

    title.textContent = "Наше видео";
    video.hidden = false;
    lightbox.classList.add("is-open", "is-video");
    lightbox.setAttribute("aria-hidden", "false");

    video.currentTime = 0;
    video.play().catch(() => {
      // Если автозапуск запрещён, запустите видео кнопкой плеера.
    });
  });

  lightbox.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      video.pause();
      video.hidden = true;
      lightbox.classList.remove("is-video");
    });
  });

  document.querySelectorAll(".header__list-link[data-image]").forEach((link) => {
    link.addEventListener("click", () => {
      video.pause();
      video.hidden = true;
      if (photoGallery) photoGallery.hidden = false;
      if (counter) counter.hidden = false;
      lightbox.classList.remove("is-video");
    });
  });
})();













(() => {
  const counter = document.querySelector("#memory-counter");
  const arrows = document.querySelectorAll(
    "#memory-prev, #memory-next"
  );

  // Верхние кнопки открывают отдельное фото — без счётчика и стрелок
  document.querySelectorAll(".header__list-link[data-image]").forEach((button) => {
    button.addEventListener("click", () => {
      if (counter) counter.hidden = true;
      arrows.forEach((arrow) => arrow.hidden = true);
    });
  });

  // Кнопка галереи показывает слайд-шоу и элементы перелистывания
  document.querySelector("#open-memory-gallery, #show-photos")?.addEventListener("click", () => {
    if (counter) counter.hidden = false;
    arrows.forEach((arrow) => arrow.hidden = false);
  });
})();
