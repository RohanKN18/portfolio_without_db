import express from "express";
import path from "path";

const app=express();
const port=8080;

import { v4 as uuidv4 } from "uuid";

uuidv4();
import methodOverride from "method-override";


app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));


import { faker } from '@faker-js/faker';
import mysql from 'mysql2';

let password="meow";

let education = [
  {
    id: 0,
    level: "10th",
    school: "JNV",
    score: "78%"
  },
  {
    id: 1,
    level: "12th",
    school: "JNV",
    score: "83%"
  },
  {
    id: 2,
    level: "Bachelor's",
    school: "PES University",
    score: "6.2 CGPA"
  },
  {
    id: 3,
    level: "job",
    school: "google",
    score: "100"
  }
];


let skills = [
  {
    skillName: "Programming Languages",
    topics: [
      {
        topicName: "tadaa",
        coreSkills: ["C", "C++", "Java (OOP, DSA)", "Python", "JavaScript"]
      }
    ]
  },
  {
    skillName: "Web Development (Full Stack)",
    topics: [
      {
        topicName: "Frontend",
        coreSkills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js"]
      },
      {
        topicName: "Backend",
        coreSkills: ["Node.js", "Express.js", "EJS templating"]
      },
      {
        topicName: "Databases",
        coreSkills: ["MySQL", "MongoDB"]
      }
    ]
  },
  {
    skillName: "Data Science & Machine Learning",
    topics: [
      {
        topicName: "Python for Data Analysis",
        coreSkills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "BeautifulSoup"]
      },
      {
        topicName: "Machine Learning",
        coreSkills: ["Scikit-learn (Regression, Classification, Clustering)", "Model Evaluation & Feature Engineering"]
      },
      {
        topicName: "Deep Learning & AI",
        coreSkills: ["Neural Networks", "Deep Learning Models", "Intro to LLMs & AI Systems"]
      }
    ]
  },
  {
    skillName: "Tools & Platforms",
    topics: [
      {
        topicName: "tadaa",
        coreSkills: ["Git & GitHub", "VS Code", "Jupyter Notebook"]
      }
    ]
  }
];


let projects = [
  {
    projectName: "Portfolio Website",
    githubLink: "https://github.com/yourname/portfolio",
    liveLink: "https://yourportfolio.com",
    description: "Personal portfolio website to showcase projects, skills, and contact information.",

    techStack: {
      languages: ["HTML", "CSS", "JavaScript"],
      frameworks: [],
      databases: [],
      tools: ["VS Code", "Git", "GitHub"]
    },

    features: [
      "Responsive design",
      "Dynamic project filtering",
      "Contact form integration"
    ],

    role: "Full Stack Developer",
    startDate: "2025-01",
    endDate: "2025-02",
    status: "Completed",

    highlights: [
      "Optimized loading speed",
      "Clean UI/UX design",
      "Reusable components"
    ]
  },

  {
    projectName: "Machine Learning Price Predictor",
    githubLink: "https://github.com/yourname/ml-project",
    liveLink: null,
    description: "A regression model that predicts prices based on input features.",

    techStack: {
      languages: ["Python"],
      frameworks: ["Scikit-learn"],
      databases: [],
      tools: ["Jupyter Notebook", "Git"]
    },

    features: [
      "Data preprocessing pipeline",
      "Model comparison",
      "Evaluation metrics dashboard"
    ],

    role: "ML Developer",
    startDate: "2024-11",
    endDate: "2024-12",
    status: "Completed",

    highlights: [
      "Achieved high prediction accuracy",
      "Implemented feature engineering",
      "Visualized model performance"
    ]
  },

  {
    projectName: "Task Manager API",
    githubLink: "https://github.com/yourname/task-api",
    liveLink: null,
    description: "RESTful API for managing tasks with authentication and CRUD operations.",

    techStack: {
      languages: ["JavaScript"],
      frameworks: ["Node.js", "Express.js"],
      databases: ["MongoDB"],
      tools: ["Postman", "Git"]
    },

    features: [
      "JWT Authentication",
      "Secure routes",
      "REST API architecture"
    ],

    role: "Backend Developer",
    startDate: "2025-03",
    endDate: "2025-04",
    status: "Completed",

    highlights: [
      "Secure authentication system",
      "Scalable backend architecture"
    ]
  }
];




//adding new skill
app.get("/portfolio/addskill",(req,res)=>{
    res.render("addskill.ejs",{ projects,skills, education, scrollTo: "skillsSection" });
});
app.post("/portfolio/addskill", (req, res) => {
    let newskill  = req.body.skill;

    skills.push({
        skillName: newskill,
        topics: []
    });

    res.redirect("/portfolio#skillsSection");
});



//adding new topic under the specific skill
app.get("/portfolio/:skillName/addtopics",(req,res)=>{
    const { skillName } = req.params;

    const selectedSkill = skills.find(
        skill => skill.skillName === skillName
    );
    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }
    res.render("addtopics.ejs", {
        projects,skills, education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});
app.post("/portfolio/:skill/addtopics", (req,res)=>{
    let skillName = req.params.skill;
    let topicName = req.body.topic;
    // find the correct skill
    let selectedSkill = skills.find(s => s.skillName === skillName);

    if(selectedSkill){
        selectedSkill.topics.push({
            topicName: topicName,
            coreSkills: []
        });
    }

    res.redirect(`/portfolio/${skillName}#skillsSection`);
});



//adding new core skill under specific topic
app.get("/portfolio/:skill/:topic/addcoreskill", (req,res)=>{
    const { skill, topic } = req.params;

    const selectedSkill = skills.find(s => s.skillName === skill);
    if(!selectedSkill) return res.send("Skill not found");

    const selectedTopic = selectedSkill.topics.find(t => t.topicName === topic);
    if(!selectedTopic) return res.send("Topic not found");

    res.render("addcoreskill.ejs",{
        selectedSkill,
        selectedTopic,
        projects, skills, education,
        scrollTo:"skillsSection"
    });
});
app.post("/portfolio/:skill/:topic/addcoreskill",(req,res)=>{
    const { skill, topic } = req.params;
    const coreSkillName = req.body.coreSkill;

    const selectedSkill = skills.find(s => s.skillName === skill);
    if(!selectedSkill) return res.send("Skill not found");

    const selectedTopic = selectedSkill.topics.find(t => t.topicName === topic);
    if(!selectedTopic) return res.send("Topic not found");

    selectedTopic.coreSkills.push(coreSkillName);

    res.redirect(`/portfolio/${skill}#skillsSection`);
});

































app.listen("8080",()=>{
    console.log("server is listening to 8080")
});

app.get("/home",(req,res)=>{
    res.render("home.ejs");
});

app.get("/publicportfolio",(req,res)=>{
    res.render("publicportfolio.ejs", { projects,skills, education });
});
app.get("/publicportfolio/:skillName", (req, res) => {
    const { skillName } = req.params;

    const selectedSkill = skills.find(
        skill => skill.skillName === skillName
    );

    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }

    res.render("publicskillindetail.ejs", {
        projects,skills, education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});
app.get("/loginform",(req,res)=>{
    res.render("loginpage.ejs", { skills, education });
});
app.post("/login", (req, res) => {
    if (req.body.password === password) {
        res.redirect("/portfolio");
    } else {
        res.render("loginfail.ejs");
    }
});
app.get("/portfolio",(req,res)=>{
    res.render("portfolio.ejs", { skills, education,projects });
});
app.get("/portfolio/:skillName", (req, res) => {
    const { skillName } = req.params;

    const selectedSkill = skills.find(
        skill => skill.skillName === skillName
    );

    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }

    res.render("skillindetail.ejs", {
        skills, education,projects,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});

app.get("/portfolio/projects/:projectName", (req, res) => {

    const { projectName } = req.params;

    const selectedProject = projects.find(
        project => project.projectName === projectName
    );

    if (!selectedProject) {
        return res.status(404).send("Project not found");
    }

    res.render("projectindetail.ejs", {
        projects,
        skills,
        education,
        selectedProject,
        scrollTo: "projectsSection"
    });
});

app.get("/publicportfolio/projects/:projectName", (req, res) => {

    const { projectName } = req.params;

    const selectedProject = projects.find(
        project => project.projectName === projectName
    );

    if (!selectedProject) {
        return res.status(404).send("Project not found");
    }

    res.render("publicprojectindetail.ejs", {
        projects,
        skills,
        education,
        selectedProject,
        scrollTo: "projectsSection"
    });
});