const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

var gsapAnimation = function () {
  // Define an array of section numbers
  var sectionNumbers = [1, 2, 3, 4, 5, 6, 7];

  // Use forEach loop to iterate over the sections
  sectionNumbers.forEach(function (sectionNumber) {
    var sectionSelector = `.page4-section${sectionNumber}`;

    gsap.from(
      sectionSelector +
        " .page4-section-left, " +
        sectionSelector +
        " .page4-section-right",
      {
        y: "200%",
        duration: 5,
        scrollTrigger: {
          trigger: sectionSelector,
          scroller: ".main",
          start: "top 100%",
          end: "top 80%",
          scrub: 2,
          ease: "power1.inOut",
        },
      }
    );
  });
};

gsapAnimation();

var fixedImage = function () {
  var elementSelectors = [
    ".page4-section1",
    ".page4-section2",
    ".page4-section3",
    ".page4-section4",
    ".page4-section5",
    ".page4-section6",
    ".page4-section7",
  ];

  var fixed = document.querySelector(".fixed-image");

  elementSelectors.forEach((selector) => {
    var element = document.querySelector(selector);
    var image = element.getAttribute("data-image");

    element.addEventListener("mouseenter", () => {
      fixed.style.backgroundImage = `url('${image}')`;
      fixed.style.display = "block";
    });

    element.addEventListener("mouseleave", () => {
      fixed.style.display = "none";
    });
  });
};

fixedImage();

var page6Right = document.querySelector(".page6-center-right");
var h1 = document.querySelector("#h1");
var h2 = document.querySelector("#h2");
var h3 = document.querySelector("#h3");

const imageChange1 = () => {
  const imageUrl1 = document
    .querySelector(".page6-center-right #image1")
    .getAttribute("src");

  page6Right.style.backgroundImage = `url('${imageUrl1}')`;
  h1.style.opacity = "1";
  h2.style.opacity = "0.6";
  h3.style.opacity = "0.6";
};
const imageChange2 = () => {
  const imageUrl2 = document.querySelector("#image2").getAttribute("src");

  page6Right.style.backgroundImage = `url('${imageUrl2}')`;
  h1.style.opacity = "0.6";
  h2.style.opacity = "1";
  h3.style.opacity = "0.6";
};
const imageChange3 = () => {
  const imageUrl3 = document.querySelector("#image3").getAttribute("src");

  page6Right.style.backgroundImage = `url('${imageUrl3}')`;
  h1.style.opacity = "0.6";
  h2.style.opacity = "0.6";
  h3.style.opacity = "1";
  console.log("Image changed");
};

document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3.5,
  cssMode: true,
  spaceBetween: 0,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

var tl = gsap.timeline();

tl.from(".loader p", {
  x: "40px",
  opacity: 0,
  duration: 1,
});
tl.to(".loader p", {
  x: "-40px",
  opacity: 0,
  duration: 1,
});

tl.to(".loader", {
  opacity: 0,
  duration: 1,
});

tl.to(".loader", {
  display: "none",
});
