// Mouse Circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};

// Animated Circles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
const z = 100;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animateCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});

// Main Button
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((mainBtn) => {
  let ripple;

  mainBtn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;

    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;

    mainBtn.prepend(ripple);
  });

  mainBtn.addEventListener("mouseleave", () => {
    mainBtn.removeChild(ripple);
  });
});

// About Me Text
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "I am a developer & I develop products that are useful to me and my clients using the best technologies for their purposes.";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnimate 5s infinite";
  });
});

// Projects
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, index) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px `;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big Project Image
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.setAttribute("src", `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    // Hidden scrool when big project img show
    document.body.style.overflowY = "hidden";

    document.removeEventListener("scroll", scrollFn);
    progressBarFn(bigImgWrapper);

    bigImgWrapper.onscroll = () => progressBarFn(bigImgWrapper);
    projectHideBtn.classList.add("change");

    // Only add 1 time
    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";

      document.addEventListener("scroll", scrollFn);

      progressBarFn();
    };
  });

  // Hide Project
  index >= 6 && (project.style.cssText = "display:none;opacity:0");
});

// Projects Button
const section3 = document.querySelector(".section-3");
const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");
let showHideBool = true;

const showProjecst = (project, index) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);

  setTimeout(() => {
    project.style.opacity = "1";
  }, index * 200);
};

const hideProjects = (project, index) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "end" });
  }, 1200);
  setTimeout(() => {
    project.style.opacity = "0";
  }, index * 100);
};

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectsBtn.classList.toggle("change");

  showHideBool
    ? (projectsBtnText.textContent = "Show Less")
    : (projectsBtnText.textContent = "Show More");

  projects.forEach((project, index) => {
    index >= 6 &&
      (showHideBool
        ? showProjecst(project, index)
        : hideProjects(project, index));
  });

  showHideBool = !showHideBool;
});

// Section 4
document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});

// Section 5
// Form
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Let's Talk`;
      formHeading.style.opacity = "1";
    }, 300);
  });
});

// Slideshow
const slideShow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideShow.firstElementChild;
  firstIcon.classList.add("faded-out");

  const thirdIcon = slideShow.children[3];
  thirdIcon.classList.add("light");

  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideShow.removeChild(firstIcon);

    slideShow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);

// Progress Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progress-bar");
const halftCircles = document.querySelectorAll(".half-circle");
const halfCircleTop = document.querySelector(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");

let scrolledPortion = 0;
let scrollBool = false;
let imageWrapper = false;

const progressBarFn = (bigImgWrapper) => {
  imageWrapper = bigImgWrapper;
  const pageViewportHeight = window.innerHeight;
  let pageHeight = 0;

  if (!imageWrapper) {
    scrolledPortion = window.pageYOffset;
    pageHeight = document.documentElement.scrollHeight;
  } else {
    pageHeight = imageWrapper.firstElementChild.scrollHeight;
    scrolledPortion = imageWrapper.scrollTop;
  }

  const scrolledPortitionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  halftCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortitionDegree}deg)`;
  });

  if (scrolledPortitionDegree >= 180) {
    halftCircles[0].style.transform = "rotate(180deg)";
    halfCircleTop.style.opacity = "0";
  } else {
    halfCircleTop.style.opacity = "1";
  }

  scrollBool = scrolledPortion + pageViewportHeight === pageHeight;

  // Arrow Rotation when Page Ended
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0)";
  }
};

// Progress Bar Click
progressBar.addEventListener("click", (e) => {
  e.preventDefault();

  if (!bigImgWrapper) {
    const sectionPositions = Array.from(sections).map(
      (section) => scrolledPortion + section.getBoundingClientRect().top
    );

    const nextPosition = sectionPositions.find(
      (sectionPosition) => sectionPosition > scrolledPortion
    );

    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, nextPosition);
  } else {
    scrollBool
      ? bigImgWrapper.scrollTo(0, 0)
      : bigImgWrapper.scrollTo(0, bigImgWrapper.scrollHeight);
  }
});

progressBarFn();

// Navigation
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

const scrollFn = () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }

  progressBarFn();
};

document.addEventListener("scroll", scrollFn);

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});
