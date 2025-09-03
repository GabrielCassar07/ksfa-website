document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const caption = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
  
    const images = Array.from(document.querySelectorAll(".gallery-grid img"));
    let currentIndex = 0;
  
    function openModal(index) {
      currentIndex = index;
      const img = images[currentIndex];
      modal.style.display = "block";
      modalImg.src = img.src;
      caption.textContent = img.alt;
    }
  
    function showNext() {
      currentIndex = (currentIndex + 1) % images.length;
      openModal(currentIndex);
    }
  
    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openModal(currentIndex);
    }
  
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        openModal(index);
      });
    });
  
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    window.addEventListener("keydown", (e) => {
      if (modal.style.display === "block") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") modal.style.display = "none";
      }
    });
  });
  