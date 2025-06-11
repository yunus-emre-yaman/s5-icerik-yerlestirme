// bu satırı silmeyin
import { siteContent } from "./content.js";
console.log("Site içeriği", siteContent);

/* Kodlar buradan aşağıya */

const logoImg = document.getElementById("logo-img");
logoImg.setAttribute("src", siteContent.images["logo-img"]);

const navLinks = document.querySelectorAll("nav a");
const navKeys = Object.keys(siteContent.nav);

navLinks.forEach((link, index) => {
  const key = navKeys[index];
  link.textContent = siteContent.nav[key];
  link.classList.add("italic");
});

const ctaH1 = document.querySelector(".cta-text h1");
const ctaButton = document.querySelector(".cta-text button");
const ctaImg = document.getElementById("cta-img");

ctaH1.innerHTML = siteContent.cta.h1;
ctaButton.textContent = siteContent.cta.button;
ctaImg.setAttribute("src", siteContent.images["cta-img"]);

const topContentHeaders = document.querySelectorAll(".top-content .text-content h4");
const topContentParagraphs = document.querySelectorAll(".top-content .text-content p");

topContentHeaders[0].innerHTML = siteContent["top-content"]["left-h4"];
topContentParagraphs[0].textContent = siteContent["top-content"]["left-content"];

topContentHeaders[1].innerHTML = siteContent["top-content"]["right-h4"];
topContentParagraphs[1].textContent = siteContent["top-content"]["right-content"];

const middleImg = document.getElementById("middle-img");
middleImg.setAttribute("src", siteContent.images["accent-img"]);

const bottomContentHeaders = document.querySelectorAll(".bottom-content .text-content h4");
const bottomContentParagraphs = document.querySelectorAll(".bottom-content .text-content p");

bottomContentHeaders[0].innerHTML = siteContent["bottom-content"]["left-h4"];
bottomContentParagraphs[0].textContent = siteContent["bottom-content"]["left-content"];

bottomContentHeaders[1].innerHTML = siteContent["bottom-content"]["middle-h4"];
bottomContentParagraphs[1].textContent = siteContent["bottom-content"]["middle-content"];

bottomContentHeaders[2].innerHTML = siteContent["bottom-content"]["right-h4"];
bottomContentParagraphs[2].textContent = siteContent["bottom-content"]["right-content"];

const contactSection = document.querySelector(".contact");
const contactH4 = contactSection.querySelector("h4");
const contactPs = contactSection.querySelectorAll("p");

contactH4.innerHTML = siteContent.contact["contact-h4"];
contactPs[0].textContent = siteContent.contact.address;
contactPs[1].textContent = siteContent.contact.phone;
contactPs[2].textContent = siteContent.contact.email;

const footerLink = document.querySelector("footer a");
footerLink.textContent = siteContent.footer.copyright;
footerLink.classList.add("bold");
