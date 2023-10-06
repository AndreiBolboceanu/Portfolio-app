"use strict";

// //////////////////////////////////////////////////////////
// make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const btnHireMe = document.querySelector("#btn-hire");
const btnProjects = document.querySelector("#btn-projects");
const sectionContact = document.querySelector("#contact");
const sectionProjects = document.querySelector("#projects");
const nav = document.querySelector(".main-nav");
const btnToTop = document.querySelector(".top");
const header = document.querySelector(".header");
const loader = document.querySelector(".preloader");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

////////////////////////////////////////////////////////////////////////
// Implementing smooth Scrolling for nav links and others

// Nav links
const links = document.querySelector(".main-nav-list");

links.addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("main-nav-link")) {
    const id = e.target.getAttribute("href");

    // smoothing selector
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

  // Close mobile navigation
  if (e.target.classList.contains("main-nav-link")) {
    headerEl.classList.toggle("nav-open");
  }
});

// Other links

btnHireMe.addEventListener("click", function (e) {
  e.preventDefault();
  // const s1coords = sectionContact.getBoundingClientRect();
  sectionContact.scrollIntoView({ behavior: "smooth" });
});

btnProjects.addEventListener("click", function (e) {
  e.preventDefault();
  // const s1coords = sectionContact.getBoundingClientRect();
  sectionProjects.scrollIntoView({ behavior: "smooth" });
});

btnToTop.addEventListener("click", function (e) {
  e.preventDefault();
  // const s1coords = sectionContact.getBoundingClientRect();
  header.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////////////////////////////
// Implementing TOP button

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const showBtnToTop = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) btnToTop.style.opacity = 1;
  else btnToTop.style.opacity = 0;
};

let headerObserver = new IntersectionObserver(showBtnToTop, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////////////////////////////
// Implementing Sticky nav

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // Cand se va declansa evenimentul. La 90% din header
  // Just visual margin
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//////////////////////////////////////////
/////  Cursor Trail

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = ["#171a1d", "#1a1e21", "#1e2125", "#212529"];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

// Functie pentru elementele care interactioneaza cu cursorul
// const interacts = function (interact) {
//   if (interact !== null) {
//     // circles.forEach((circle) => (circle.style.opacity = 0));
//     circles.forEach((circle) => (circle.style.backgroundColor = "#fff"));
//   } else {
//     circles.forEach(
//       (circle, i) => (circle.style.backgroundColor = colors[i % colors.length])
//     );
//   }
// };

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;

  // Daca cursorul ajunge in zona unde sunt elemente sa dispara
  // const interactableNav = e.target.closest(".main-nav-list");
  // const interactableHero1 = e.target.closest(".hero-container-1");
  // console.log(interactableHero1);

  // interacts(interactableHero1);
});

// window.addEventListener("mousemove", function (e) {
//   const interactableSlider = e.target.closest(".slider");
//   interacts(interactableSlider);
// });

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
