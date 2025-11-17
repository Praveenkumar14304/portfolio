function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// Horizontal Projects Carousel
let currentGroup = 0;
let totalProjects = 0;
let projectsPerGroup = 3;

function initCarousel() {
  const slides = document.querySelectorAll('.project-slide');
  totalProjects = slides.length;
  
  // Set initial active states
  updateActiveProjects();
  createIndicators();
  
  // Update projects per group based on screen size
  updateProjectsPerGroup();
  window.addEventListener('resize', updateProjectsPerGroup);
}

function updateProjectsPerGroup() {
  if (window.innerWidth >= 1200) {
    projectsPerGroup = 3;
  } else if (window.innerWidth >= 768) {
    projectsPerGroup = 2;
  } else {
    projectsPerGroup = 1;
  }
  updateActiveProjects();
  updateIndicators();
}

function moveCarousel(direction) {
  const totalGroups = Math.ceil(totalProjects / projectsPerGroup);
  currentGroup = (currentGroup + direction + totalGroups) % totalGroups;
  updateActiveProjects();
  updateIndicators();
}

function updateActiveProjects() {
  const slides = document.querySelectorAll('.project-slide');
  const carousel = document.querySelector('.projects-carousel');
  
  // Reset all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Calculate which projects should be active
  const startIndex = currentGroup * projectsPerGroup;
  
  for (let i = 0; i < projectsPerGroup; i++) {
    const projectIndex = (startIndex + i) % totalProjects;
    if (slides[projectIndex]) {
      slides[projectIndex].classList.add('active');
    }
  }
  
  // Calculate transform for horizontal movement
  if (window.innerWidth < 1200) {
    const slideWidth = 100 / projectsPerGroup;
    const transformValue = -currentGroup * slideWidth;
    carousel.style.transform = `translateX(${transformValue}%)`;
  } else {
    // On desktop, we use flex wrap, so no transform needed
    carousel.style.transform = 'translateX(0)';
  }
}

function createIndicators() {
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const totalGroups = Math.ceil(totalProjects / projectsPerGroup);
  
  indicatorsContainer.innerHTML = '';
  
  for (let i = 0; i < totalGroups; i++) {
    const indicator = document.createElement('div');
    indicator.className = `carousel-indicator ${i === currentGroup ? 'active' : ''}`;
    indicator.onclick = () => {
      currentGroup = i;
      updateActiveProjects();
      updateIndicators();
    };
    indicatorsContainer.appendChild(indicator);
  }
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');
  const totalGroups = Math.ceil(totalProjects / projectsPerGroup);
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentGroup);
  });
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initCarousel);