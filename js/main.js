// ############################################################

// Show and Hide Settings Box By click on gear
let gear = document.querySelector(".toggle-gear .fa-gear");
let settingsBox = document.getElementsByClassName("settings-box")[0];

gear.onclick = function () {
  // For rotation
  this.classList.toggle("fa-spin");
  // For Hide/show
  settingsBox.classList.toggle("opened");
};
// ############################################################

// Options Yes/No Random Backgrounds

let randomBackgroundEles = document.querySelectorAll(
  ".random-backgrounds span"
);

// Random Background Option
let backgroundOption = true;
// Variable to control the interval
let backgroundInterval;

// Check if there's randomBackgroundItem in local storage
let backgroundLocalItem = localStorage.getItem("randomBackgroundItem");
if (backgroundLocalItem) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

randomBackgroundEles.forEach((spn) => {
  spn.addEventListener("click", (e) => {
    // Add and remove .active class
    randomBackgroundEles.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("randomBackgroundItem", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("randomBackgroundItem", false);
    }
  });
});

// ############################################################

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of imgs
let imgsArray = ["bg-1.png", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg"];
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 9000);
  }
}
randomizeImgs();

// ############################################################

let colorsList = document.querySelectorAll(".colors-list li");
// Check if there is mainColor in localStorage
if (localStorage.getItem("mainColor")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("mainColor")
  );
  colorsList.forEach((li) => {
    li.classList.remove("active");
    // [Method 1]
    // if(li.dataset.color === localStorage.getItem('mainColor')) {
    //     li.classList.add('active');
    // }
  });
  // [Method 2]
  document
    .querySelector(`[data-color="${localStorage.getItem("mainColor")}"]`)
    .classList.add("active");
}
// Switch Body Color
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Selet color on :root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set color on local Storage
    localStorage.setItem("mainColor", e.target.dataset.color);
    // Add and remove .active class
    colorsList.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// ###########################################################

// Show skills Progress after scrollY = Our Skills

// Select our-skills
let ourskills = document.querySelector(".skills");

window.onscroll = function () {
  // our-skills Offset Top
  let skillsOffsetTop = ourskills.offsetTop;

  // Outer our-skills Height
  let skillsOuterHeight = ourskills.offsetHeight;

  //window Height
  let windowHeight = this.innerHeight + 200;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  // All skills spans
  let allSkills = document.querySelectorAll(".skill-box .progress-holder span");
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = "0px";
    });
  }
};

// ###########################################################

// Create Popup with the images (Gallery)

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (_) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    // Append Overlay-element to the body
    document.body.appendChild(overlay);
    // Create popup box
    let popUpBox = document.createElement("div");
    popUpBox.className = "popup-box";
    // Create the image
    let popUpImage = document.createElement("img");
    popUpImage.src = img.src;
    // Append The Image to popupbox
    popUpBox.appendChild(popUpImage);
    // Append popUpBox to the body
    document.body.appendChild(popUpBox);
    // Add event listener to the overlay to hide the popup when clicking outside of it
    overlay.addEventListener("click", () => {
      // Remove the overlay and the popup box
      document.body.removeChild(overlay);
      document.body.removeChild(popUpBox);
    });
    // Check if img.alt not empty
    if (img.hasAttribute("alt") && img.alt !== "") {
      // create heading
      let imgHead = document.createElement("h3");
      imgHead.style =
        "margin-top: 0; text-align: center; color: var(--main-color)";
      // create img Text
      let imgText = document.createTextNode(img.alt);
      // append imgText to imgHead
      imgHead.appendChild(imgText);
      // append imgHead to popup-box
      popUpBox.prepend(imgHead);
    }
    // Create The Close span
    let closeSpan = document.createElement("span");
    closeSpan.innerHTML = "x";
    closeSpan.className = "close-span";
    // append closeSpan to popUpBox
    popUpBox.appendChild(closeSpan);
    // Create EventListener(click) 
    closeSpan.addEventListener("click", () => {
      document.body.removeChild(overlay);
      document.body.removeChild(popUpBox);
    });
  });
});

// ###########################################################
// initialize Swiper
const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 5000,
  },
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
});

// ###########################################################
// initialize Nav-bullets

let allBullets = document.querySelectorAll('.nav-bullets .bullet');

// ###########################################################

// initialize Nav-bullets
let allLinks = document.querySelectorAll('.links a');

function scrollToSection(sections) {
  sections.forEach((section) => {

    section.addEventListener('click', (e) => {

        e.preventDefault()

        document.querySelector(e.target.dataset.section).scrollIntoView({

          behavior: 'smooth'

        });

      })
      
  })
}
scrollToSection(allLinks)
scrollToSection(allBullets)

// ###########################################################
// initialize Show Bullets
let bulletsSpan =  document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets')
let localStorageItem = localStorage.getItem("bullets_option");

if(localStorageItem) {

  bulletsContainer.style.display = localStorage.getItem("bullets_option");

  bulletsSpan.forEach(span => {
    span.classList.remove('active');
  })

  document.querySelector(`[data-display="${localStorage.getItem("bullets_option")}"]`)
  .classList.add("active");

} 

bulletsSpan.forEach(span => {
    span.addEventListener('click', e => {
      if(span.dataset.display === 'block') {

        bulletsContainer.style.display = 'block';

        localStorage.setItem('bullets_option', 'block');

      } else {

        bulletsContainer.style.display = 'none';

        localStorage.setItem('bullets_option', 'none');

      }
      handleActiveClass(e)
    })
})
// ###########################################################

// Reset Button functionality 
document.querySelector('.reset-options').onclick = function() {
  localStorage.removeItem('randomBackgroundItem');
  localStorage.removeItem('mainColor');
  localStorage.removeItem('bullets_option');
  window.location.reload();
}

// ###########################################################
// initialize toggle menu

let toggleBtn = document.getElementById('toggle-btn');

let menu = document.querySelector('.landing-page .links');

toggleBtn.onclick = _ => {

  menu.classList.toggle('open');

}

document.addEventListener('click', event => {
  let target = event.target;
  
  if (target !== toggleBtn && target !== menu) {

    if(menu.classList.contains('open')) {

        menu.classList.remove('open');

    }
  }
});

// Stop Propagation on menu 
menu.onclick = e => {
  e.stopPropagation();
}
// ###########################################################
// initialize Fixed Header 

// ###########################################################

// Handle Active Class 
function handleActiveClass(ev) {
  ev.target.parentElement.querySelectorAll('.active').forEach(element => {

    element.classList.remove('active');

  })
  ev.target.classList.add('active')
}

// ###########################################################
var x = 10;
var x = 9;

console.log(x);