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
    projectSlug: "portfolio-website",
    githubLink: "https://github.com/yourname/portfolio",
    liveLink: "https://yourportfolio.com",
    image: "images/portfolio.png",   // 👈 add image here
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
    projectSlug: "machine-learning-price-predictor",
    githubLink: "https://github.com/yourname/ml-project",
    liveLink: null,
    image: "images/ml.png",
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
    projectSlug: "task-manager-api",
    githubLink: "https://github.com/yourname/task-api",
    liveLink: null,
    image: "images/taskapi.png",
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
//edit route skill
app.get("/portfolio/:skill/edit",(req,res)=>{
    const { skill } = req.params;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    if(!selectedSkill) return res.send("Skill not found");

    res.render("editskill.ejs",{
        selectedSkill,
        projects,
        skills,
        education
    });
});
app.post("/portfolio/:skill/edit",(req,res)=>{
    const { skill } = req.params;
    const newName = req.body.skillName;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    if(!selectedSkill) return res.send("Skill not found");

    selectedSkill.skillName = newName;

    res.redirect(`/portfolio/${newName}#skillsSection`);
});
//delete skill
app.delete("/portfolio/:skill/delete",(req,res)=>{
    const { skill } = req.params;

    skills = skills.filter(s => s.skillName !== skill);

    res.redirect("/portfolio");
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
// deleting topic
app.delete("/portfolio/:skill/:topic",(req,res)=>{
    const { skill, topic } = req.params;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    if(!selectedSkill) return res.send("Skill not found");

    selectedSkill.topics =
        selectedSkill.topics.filter(t=>t.topicName!==topic);

    res.redirect(`/portfolio/${skill}#skillsSection`);
});
//editing topic
app.get("/portfolio/:skill/:topic/edit",(req,res)=>{
    const { skill, topic } = req.params;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    const selectedTopic = selectedSkill?.topics.find(t=>t.topicName===topic);

    if(!selectedSkill || !selectedTopic)
        return res.send("Not found");

    res.render("edittopic.ejs",{
        selectedSkill,
        selectedTopic
    });
});
app.put("/portfolio/:skill/:topic",(req,res)=>{
    const { skill, topic } = req.params;
    const newName = req.body.topicName;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    const selectedTopic = selectedSkill?.topics.find(t=>t.topicName===topic);

    if(selectedTopic){
        selectedTopic.topicName = newName;
    }

    res.redirect(`/portfolio/${skill}#skillsSection`);
});




//core skill

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
//edit 
app.get("/portfolio/:skill/:topic/:core/edit",(req,res)=>{
    const { skill, topic, core } = req.params;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    const selectedTopic = selectedSkill?.topics.find(t=>t.topicName===topic);

    if(!selectedSkill || !selectedTopic)
        return res.send("Not found");

    res.render("editcore.ejs",{
        selectedSkill,
        selectedTopic,
        core
    });
});

app.post("/portfolio/:skill/:topic/:core/edit",(req,res)=>{
    const { skill, topic, core } = req.params;
    const newName = req.body.coreName;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    const selectedTopic = selectedSkill?.topics.find(t=>t.topicName===topic);

    if(!selectedSkill || !selectedTopic)
        return res.send("Not found");

    const index = selectedTopic.coreSkills.indexOf(core);
    if(index !== -1){
        selectedTopic.coreSkills[index] = newName;
    }

    res.redirect(`/portfolio/${skill}#skillsSection`);
});

//delete
app.delete("/portfolio/:skill/:topic/:core/delete",(req,res)=>{
    const { skill, topic, core } = req.params;

    const selectedSkill = skills.find(s=>s.skillName===skill);
    const selectedTopic = selectedSkill?.topics.find(t=>t.topicName===topic);

    if(!selectedSkill || !selectedTopic)
        return res.send("Not found");

    selectedTopic.coreSkills =
        selectedTopic.coreSkills.filter(c=>c!==core);

    res.redirect(`/portfolio/${skill}#skillsSection`);
});







////////projects////////////
app.get("/publicportfolio/projects/:slug", (req, res) => {
    const slug = req.params.slug;

    const project = projects.find(p => p.projectSlug === slug);

    if (!project) return res.status(404).send("Project not found");

    res.render("publicprojectdetails.ejs", { project });
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
