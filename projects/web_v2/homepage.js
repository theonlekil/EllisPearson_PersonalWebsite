const experience = document.querySelector('#experience-btn');
const educationBtn = document.querySelector('#education-btn');
const projects = document.querySelector('#projects-btn');

const wex = document.querySelector('#wex');
const edu = document.querySelector('#edu');
const pro = document.querySelector('#pro');

const buttons = [experience, educationBtn, projects];

function showSection(section, button) {
    wex.style.display = 'none';
    edu.style.display = 'none';
    pro.style.display = 'none';
    
    section.style.display = 'block';
    
    buttons.forEach(btn => btn.classList.remove('active'));
    
    button.classList.add('active');
}

showSection(wex, experience);

experience.addEventListener('click', () => {
    showSection(wex, experience);
});

educationBtn.addEventListener('click', () => {
    showSection(edu, educationBtn);
});

projects.addEventListener('click', () => {
    showSection(pro, projects);
});