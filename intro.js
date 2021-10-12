const tl = gsap.timeline({ default: { ease: "power1.out" } });

/* Intro animation */
tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");

/* Container animation */
tl.fromTo(".glass-box", { y: "200%" }, { y: "0%", duration: 1.5 }, "-=1.2");
tl.fromTo(".circle-intro", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
tl.fromTo(
  ".grid-container",
  { opacity: 0 },
  { opacity: 1, duration: 4 },
  "-=1.5"
);

/* Container element's animation */
/* tl.fromTo(".controls-container", {opacity: 0}, { opacity: 1, duration: 2}, "-=2.5");
tl.fromTo(".drums", {opacity: 0}, { opacity: 1, duration: 2}, "-=2");
tl.fromTo(".piano", {opacity: 0}, { opacity: 1, duration: 2}, "-=1"); */
/* test commit */