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



app.listen("8080",()=>{
    console.log("server is listening to 8080")
});

app.get("/home",(req,res)=>{
    res.render("home.ejs");
});

app.get("/publicportfolio",(req,res)=>{
    res.render("publicportfolio.ejs", { skills, education });
});

app.get("/portfolio",(req,res)=>{
    res.render("portfolio.ejs", { skills, education });
});

app.get("/addskill",(req,res)=>{
    res.render("addskill.ejs",{ skills, education, scrollTo: "skillsSection" });
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
        skills, education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
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
        skills, education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});
app.post("/portfolio", (req, res) => {
    let { newskill } = req.body;

    skills.push({
        skillName: newskill,
        topics: []
    });

    res.redirect("/portfolio#skillsSection");
});



app.get("/portfolio/:skillName/addtopics",(req,res)=>{
    const { skillName } = req.params;

    const selectedSkill = skills.find(
        skill => skill.skillName === skillName
    );
    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }
    res.render("addtopics.ejs", {
        skills, education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});
app.post("/portfolio/:skillName", (req, res) => {
    const { skillName } = req.params;
    const { newtopic } = req.body;
    // Find the skill object
    const skill = skills.find(
        skill => skill.skillName === skillName
    );

    if (!skill) {
        return res.status(404).send("Skill not found");
    }

    skill.topics.push({ topicName: newtopic, coreSkills: [] });

    res.redirect(`/portfolio/${encodeURIComponent(skill.skillName)}#skillsSection`);
});



