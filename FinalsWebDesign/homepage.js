// Function to handle parallax effect
function handleParallax() {
  const scrollPosition = window.scrollY;
  const parallaxElements = document.querySelectorAll(".parallax");
  
  parallaxElements.forEach((element) => {
    const parallaxSpeed = parseFloat(element.getAttribute("data-parallax-speed"));
    element.style.backgroundPositionY = -scrollPosition * parallaxSpeed + "px";
  });
}

// Add event listener for scroll event
window.addEventListener("scroll", handleParallax);

const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
const subMenuTitles = document.querySelectorAll(".submenu .menu-title");
const mainContent = document.querySelector(".main");
const aboutUsSection = document.getElementById('aboutus');
const contactUsSection = document.getElementById('contactus');

// Function to close the sidebar
function closeSidebar() {
  sidebar.classList.add("close");
  document.querySelector(".navbar").style.left = "0";
  mainContent.style.left = "0";
  mainContent.style.width = "100%";
  aboutUsSection.style.left = "0";
  contactUsSection.style.left = "0";
}

// Add event listener to close the sidebar when any link is clicked
document.querySelectorAll('.menu-items .item a').forEach(link => {
  link.addEventListener('click', () => {
    closeSidebar(); // Call the closeSidebar function when any link is clicked
  });
});

// Toggle sidebar on button click
sidebarClose.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    document.querySelector(".navbar").style.left = "0";
    mainContent.style.left = "0";
    mainContent.style.width = "100%";
    aboutUsSection.style.left = "0";
    contactUsSection.style.left = "0";
  } else {
    document.querySelector(".navbar").style.left = "260px";
    mainContent.style.left = "260px";
    mainContent.style.width = "calc(100% - 260px)";
    aboutUsSection.style.left = "260px";
    contactUsSection.style.left = "260px";
  }
});

// Handle submenu item clicks
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.add("submenu-active");
    item.classList.add("show-submenu");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
      }
    });
  });
});

// Handle submenu title clicks to close submenu
subMenuTitles.forEach((title) => {
  title.addEventListener("click", () => {
    menu.classList.remove("submenu-active");
  });
});

// Scroll to About Us section when About Us link is clicked
const aboutUsLink = document.querySelector('.menu-items .item:nth-child(4) a');
aboutUsLink.addEventListener('click', () => {
  closeSidebar();
  aboutUsSection.scrollIntoView({ behavior: 'smooth' });
});

// Scroll to Contact Us section when Contact Us link is clicked
const contactUsLink = document.querySelector('.menu-items .item:nth-child(5) a');
contactUsLink.addEventListener('click', () => {
  closeSidebar();
  contactUsSection.scrollIntoView({ behavior: 'smooth' });
});

function scrollToSection(targetSectionId) {
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Function to handle scroll event
function handleScroll() {
  const scrollPosition = window.scrollY;
  const contactUsPosition = contactUsSection.offsetTop;

  // Check if the Contact Us section is in view
  if (scrollPosition >= contactUsPosition) {
    aboutUsSection.classList.add('fade-out'); // Add fade-out class to About Us section
  } else {
    aboutUsSection.classList.remove('fade-out'); // Remove fade-out class from About Us section
  }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial check on page load
handleScroll();

// Get the "SIGN OUT" link
const signOutLink = document.querySelector('a[href="login.html"]');

// Add event listener to the "SIGN OUT" link
signOutLink.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default behavior of the link
  handleSignOut(); // Call the function to handle sign out
});

// Function to handle sign out
function handleSignOut() {
  const confirmed = confirm("Are you sure you want to sign out?");
  if (confirmed) {
    // Redirect to the login page
    window.location.href = "login.html";
  }
}

