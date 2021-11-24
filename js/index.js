var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
  },
});

const buttonMenu = document.getElementById("openMenu");
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close");

buttonMenu.addEventListener("click", e=>{
    menu.classList.add("menu__container--mobile");
})

closeMenu.addEventListener("click", e=>{
    menu.classList.remove("menu__container--mobile");
})