function navigateTo(packageName) {
  window.location.href = packageName + '.html';
}

document.addEventListener('DOMContentLoaded', function () {
  const previewOverlay = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const images = document.querySelectorAll('.zoomable');
  let currentIndex = 0;

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      previewImg.src = images[index].src;
      currentIndex = index;
      previewOverlay.style.display = 'flex';
    }
  }

  images.forEach((img, index) => {
    img.addEventListener('click', function () {
      showImage(index);
    });
  });

  closeBtn.addEventListener('click', function () {
    previewOverlay.style.display = 'none';
  });

  prevBtn.addEventListener('click', function () {
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    showImage(currentIndex + 1);
  });

  previewOverlay.addEventListener('click', function (e) {
    if (e.target === previewOverlay) {
      previewOverlay.style.display = 'none';
    }
  });

  document.addEventListener('keydown', function (e) {
    if (previewOverlay.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      if (e.key === 'Escape') previewOverlay.style.display = 'none';
    }
  });
});
