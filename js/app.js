/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
*/

const navBarContainer = document.querySelector(".navbar__menu");
const navItemsList = document.getElementById("navbar__list");

const sectionsList = document.querySelectorAll("section");

const headerSection = document.querySelector(".page__header");
const footerSection = document.querySelector(".page__footer");

const mainHero = document.querySelector(".main__hero");

const scrollTopBtn = document.getElementById("scrollTopBtn");

const burgerMenu = document.getElementById("burger-menu");

let timeOutId;


let scrollTopBtnAfter = 150; // Scroll to top button appears after 150px scroll

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // smooth scroll to top of the page
    });
}

function toggleScrollTopBtn(scrollTopBtnAfter) {
    if (window.scrollY > scrollTopBtnAfter) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// Add class 'active' to section when near top of viewport
function makeSectionActive() {
    sectionsList.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const sectionLink = document.getElementById(`${section.id}-link`);

        if (sectionTop <= 150 && sectionBottom >= 150) {
            section.classList.add("active");
            sectionLink.classList.add("active");
        } else {
            section.classList.remove("active");
            sectionLink.classList.remove("active");
        }
    });
}


function toggleNavbarVisibility() {
    // timeout id for calling clearTimeout
    if(timeOutId !== undefined) {
        window.clearTimeout(timeOutId);
    }
  
    headerSection.style.cssText = "opacity: 1; transition: ease 0.2s;";

    timeOutId = setTimeout(() => {
        headerSection.style.cssText = "opacity: 0; transition: ease 0.2s;";
        window.clearTimeout(timeOutId);
    }, 4000);


  }
  

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function menuBuilder() {
    
    const navItemHome = document.createElement("li");
    navItemHome.innerHTML = `<a href="#home" class="menu__link">${mainHero.dataset.nav}</a>`;   
    navItemsList.appendChild(navItemHome);
    navItemHome.addEventListener("click", scrollToTop);

    sectionsList.forEach(section => {
        const navItem = document.createElement("li");
        navItem.innerHTML = `<a href="#${section.id}" id="${section.id}-link" class="menu__link">${section.dataset.nav}</a>`;   
        
        navItem.addEventListener("click", scrollToSection);
        
        navItemsList.appendChild(navItem);
    });
}

//Build sections collapsible
function buildCollapsibleSections() {
    sectionsList.forEach(section => {
        const sectionHeader = section.querySelector("h2");
        sectionHeader.addEventListener("click", () => {
            section.classList.toggle("collapsed");
        });
    });
}


// Scroll to anchor ID using scrollTO event

function scrollToSection(e) {
    e.preventDefault();
    const sectionId = e.target.getAttribute("href");
    const section = document.querySelector(sectionId);
    section.scrollIntoView({
        behavior: "smooth"
    });

}

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener("DOMContentLoaded", () => {
    // Call Build menu
    menuBuilder();

    // Build collapsible sections
    buildCollapsibleSections()

});

window.addEventListener("scroll", (e) => {

    // Set sections as active
    makeSectionActive();

    // Toggle scroll to top button
    toggleScrollTopBtn(scrollTopBtnAfter);

    // Toggle navbar visibility
    toggleNavbarVisibility();

});


burgerMenu.addEventListener("click", () => {
    navBarContainer.classList.toggle("active");
});


// Scroll to section on link click
scrollTopBtn.addEventListener("click", () => {
    scrollToTop();
});






