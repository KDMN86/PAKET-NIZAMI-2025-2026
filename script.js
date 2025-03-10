function navigateTo(packageName) {
  window.location.href = packageName + '.html';
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script berjalan!');

  const previewOverlay = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');
  const closeBtn = document.querySelector('.close-btn');

  if (!previewOverlay || !previewImg || !closeBtn) {
    console.log('Elemen tidak ditemukan! Periksa HTML.');
    return;
  }

  let scale = 1;
  let isDragging = false;
  let startX,
    startY,
    translateX = 0,
    translateY = 0;

  // Event untuk menampilkan gambar dalam preview
  document.querySelectorAll('.zoomable').forEach((img) => {
    img.addEventListener('click', function () {
      previewImg.src = this.src;
      previewOverlay.style.display = 'flex';
      scale = 1;
      translateX = 0;
      translateY = 0;
      previewImg.style.transform = `scale(${scale}) translate(0px, 0px)`;
    });
  });

  // Event untuk menutup preview
  closeBtn.addEventListener('click', function () {
    previewOverlay.style.display = 'none';
  });

  previewOverlay.addEventListener('click', function (e) {
    if (e.target === previewOverlay) {
      previewOverlay.style.display = 'none';
    }
  });

  // Event untuk zoom in/out dengan scroll
  previewImg.addEventListener('wheel', function (e) {
    e.preventDefault();
    let zoomFactor = 0.1;
    if (e.deltaY < 0) {
      scale += zoomFactor;
    } else {
      scale = Math.max(1, scale - zoomFactor);
    }
    previewImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  });

  // Event untuk drag gambar
  previewImg.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    previewImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const backButton = document.getElementById('back-button');

  if (backButton) {
    backButton.addEventListener('click', function () {
      history.back();
    });
  }
});
