import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize smooth scroll
const lenis = new Lenis({
  duration: 0.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  smoothTouch: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.querySelector('.hero-background').appendChild(renderer.domElement);

// Create animated background geometry
const geometry = new THREE.IcosahedronGeometry(8, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x045e92,
  wireframe: true,
  transparent: true,
  opacity: 0.7
});
const icosahedron = new THREE.Mesh(geometry, material);
scene.add(icosahedron);

camera.position.z = 25;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  icosahedron.rotation.x += 0.003;
  icosahedron.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = cursor.querySelector('.cursor-dot');
const cursorOutline = cursor.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = 0;
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });

  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

// Typed text animation
const typedTextElement = document.querySelector('.typed-text');
const textArray = ['Web', 'Frontend', 'Backend', 'Full Stack'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeText() {
  const currentText = textArray[textIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = erasingDelay;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 200 - Math.random() * 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = newTextDelay;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
  }
  
  setTimeout(typeText, typingDelay);
}

setTimeout(typeText, newTextDelay);

// 3D Skills Sphere
const skillsSphereContainer = document.querySelector('.skills-sphere-container');
if (skillsSphereContainer) {
  const skillsScene = new THREE.Scene();
  const skillsCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const skillsRenderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  
  skillsRenderer.setSize(skillsSphereContainer.clientWidth, skillsSphereContainer.clientHeight);
  skillsRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  skillsSphereContainer.appendChild(skillsRenderer.domElement);
  
  // Create skills sphere
  const skills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python',
    'Three.js', 'GSAP', 'Git', 'Responsive', 'UI/UX', 'C++'
  ];
  
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x045e92,
    wireframe: true
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  skillsScene.add(sphere);
  
  // Add skill labels
  skills.forEach((skill, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    
    const x = 5 * Math.sin(phi) * Math.cos(theta);
    const y = 5 * Math.sin(phi) * Math.sin(theta);
    const z = 5 * Math.cos(phi);
    
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-tag';
    skillDiv.textContent = skill;
    skillDiv.style.position = 'absolute';
    skillsSphereContainer.appendChild(skillDiv);
    
    // Store position data
    skillDiv.userData = { x, y, z };
  });
  
  skillsCamera.position.z = 15;
  
  // Animation loop for skills sphere
  function animateSkillsSphere() {
    requestAnimationFrame(animateSkillsSphere);
    
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    
    // Update skill tag positions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
      const { x, y, z } = tag.userData;
      
      // Apply rotation
      const rotatedX = x * Math.cos(sphere.rotation.y) + z * Math.sin(sphere.rotation.y);
      const rotatedZ = -x * Math.sin(sphere.rotation.y) + z * Math.cos(sphere.rotation.y);
      
      // Project 3D position to 2D screen
      const scale = skillsCamera.position.z / (skillsCamera.position.z - rotatedZ);
      const screenX = (rotatedX * scale) + (skillsSphereContainer.clientWidth / 2);
      const screenY = (y * scale) + (skillsSphereContainer.clientHeight / 2);
      
      // Apply position and scale based on z-position
      tag.style.left = `${screenX}px`;
      tag.style.top = `${screenY}px`;
      tag.style.opacity = rotatedZ < 0 ? 0.3 : 1;
      tag.style.transform = `scale(${scale * 0.5})`;
      tag.style.zIndex = Math.floor(rotatedZ * 100);
    });
    
    skillsRenderer.render(skillsScene, skillsCamera);
  }
  
  animateSkillsSphere();
  
  // Handle resize for skills sphere
  window.addEventListener('resize', () => {
    skillsRenderer.setSize(skillsSphereContainer.clientWidth, skillsSphereContainer.clientHeight);
  });
}

// Text animations
const animateHeadline = () => {
  const headline = new SplitType('h1', { types: 'chars' });
  gsap.from(headline.chars, {
    opacity: 0,
    y: 100,
    rotateX: -90,
    stagger: 0.02,
    duration: 1,
    ease: 'power4.out'
  });
};

// Scroll animations
const initScrollAnimations = () => {
  // Animate sections on scroll
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Animate skill bars
  gsap.utils.toArray('.skill-progress').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    gsap.to(bar, {
      scrollTrigger: {
        trigger: bar,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      },
      width: `${progress}%`,
      duration: 1.5,
      ease: 'power3.out'
    });
  });

  // Animate portfolio items
  gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 100,
      rotation: 5,
      duration: 0.8,
      ease: 'power4.out',
      delay: i * 0.1
    });
  });
};

// Mobile menu
const menuIcon = document.querySelector('.nav-toggle');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  navList.classList.toggle('active');

  if (navList.classList.contains('active')) {
    gsap.from('.navlist li', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out'
    });
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!menuIcon.contains(e.target) && !navList.contains(e.target)) {
    menuIcon.classList.remove('active');
    navList.classList.remove('active');
  }
});

// Sticky header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 0);
});

// Back to top button
const backToTop = document.createElement('div');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('active', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
  lenis.scrollTo('top', { duration: 1.5 });
});

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        item.style.display = 'block';
      } else {
        gsap.to(item, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            item.style.display = 'none';
          }
        });
      }
    });
  });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);

  // Initialize animations
  animateHeadline();
  initScrollAnimations();
});
