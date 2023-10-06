const slider = function () {
    const slides = document.querySelectorAll(".slide");
  
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");
  
    let currSlide = 0;
    const maxSlide = slides.length;
  
    // Creating dots
    const createDots = function () {
      slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
      });
    };
  
    // Function active dot
    const activateDot = function (slide) {
      document
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));
  
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    };
  
    // Function go to slide
    const goToSlide = function (slide) {
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      );
  
      // Show/hide buttons based on current slide
      if (slide === 0) {
        btnLeft.style.display = "none";
      } else {
        btnLeft.style.display = "block";
      }
  
      if (slide === maxSlide - 1) {
        btnRight.style.display = "none";
      } else {
        btnRight.style.display = "block";
      }
    };
  
    // Function next slide
    const nextSlide = function () {
      currSlide = (currSlide + 1) % maxSlide;
      goToSlide(currSlide);
      activateDot(currSlide);
    };
  
    // Function prev slide
    const prevSlide = function () {
      currSlide = (currSlide - 1 + maxSlide) % maxSlide;
      goToSlide(currSlide);
      activateDot(currSlide);
    };
  
    // Initialization
    const init = function () {
      goToSlide(0);
      createDots();
      activateDot(0);
    };
    init();
  
    // Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
  
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });
  
    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const slide = Number(e.target.dataset.slide);
        currSlide = slide;
        goToSlide(currSlide);
        activateDot(currSlide);
      }
    });
  };
  slider();
  