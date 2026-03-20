// ================= IMPORTS =================
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";

import { faker } from "@faker-js/faker";
import mysql from "mysql2";

// ================= APP SETUP =================
const app = express();
const port = process.env.PORT || 8080;

// ================= PATH SETUP =================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");

// ================= UTIL USAGE =================
uuidv4(); // (only call when needed)





let password="meow";

let greeting = {
  hi: "Hi",
  name: "ROHAN K N",
  title: "Software Developer / Full-Stack & Data Science Enthusiast",
  description: `Passionate software developer with expertise in full-stack web development and data science/AI. Skilled in building efficient, scalable, and user-centric web applications using HTML, CSS, JavaScript, React, Node.js, Express, and databases (MySQL & MongoDB). Experienced in Python-based data analysis, machine learning, and deep learning, with hands-on knowledge of NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, and neural network models. Strong foundation in problem-solving and data structures & algorithms, eager to contribute to innovative projects that bridge web development and AI-driven solutions. Thrives in collaborative environments and committed to delivering high-quality, impactful software.`
};

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
  },
  {
    id: 4,
    level: "job",
    school: "boww",
    score: "100"
  }
];


let skills = [
  {
    skillName: "Programming Languages",
    slug: "programming-lang",
    topics: [
      {
        topicName: "tadaa",
        coreSkills: ["C", "C++", "Java (OOP, DSA)", "Python", "JavaScript"]
      }
    ]
  },
  {
    skillName: "Web Development (Full Stack)",
    slug: "web-dev",
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
    slug: "ds-ml",
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
    slug: "tools-platforms",
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

let footerData = {
  contact: {
    email: "yourmail@example.com",
    phone: "+91 9876543210"
  },

  socialLinks: [
    {
      name: "Instagram",
      url: "#"
    },
    {
      name: "GitHub",
      url: "#"
    },
    {
      name: "LinkedIn",
      url: "#"
    }
  ],

  copyright: {
    year: 2026,
    name: "Your Name meow"
  }
};




// ✅ GLOBAL DATA (locals)
app.use((req, res, next) => {
    res.locals.skills = skills;
    res.locals.education = education;
    res.locals.projects = projects;
    res.locals.password = password;
    res.locals.greeting = greeting;
    res.locals.footerData=footerData;
    next();
});

// ================= ROUTES =================
import AdminRouter from "./routes/admin.js";
import PublicportfolioRouter from "./routes/publicportfolio.js";
import PortfolioRouter from "./routes/portfolio.js";
import portfolioskillRouter from "./routes/portfolioskill.js";
import portfolioprojectRouter from "./routes/portfolioproject.js";

// ✅ ROOT ROUTES
app.use("/", AdminRouter);
app.use("/", PublicportfolioRouter);

// ✅ PORTFOLIO BASE
app.use("/portfolio", PortfolioRouter);

// ✅ PROJECT ROUTES (PUT FIRST ⚠️)
app.use("/portfolio/projects", portfolioprojectRouter);


// ✅ SKILL ROUTES (PUT AFTER ⚠️)
app.use("/portfolio/:skillSlug", portfolioskillRouter);

// ================= DEFAULT ROUTES =================
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

// ================= SERVER =================
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});