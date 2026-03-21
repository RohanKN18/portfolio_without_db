// ================= IMPORTS =================
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";


import greeting from "./data/greeting.js";
import education from "./data/education.js";
import skills from "./data/skills.js";
import projects from "./data/projects.js";
import footerData from "./data/footer.js";


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



let password="meow";




// ================= GLOBAL DATA (res.locals) =================
// Makes data available in all EJS templates
app.locals.skills = skills;
app.locals.education = education;
app.locals.projects = projects;
app.locals.password = password;
app.locals.greeting = greeting;
app.locals.footerData = footerData;

app.use((req, res, next) => {
    res.locals.skills = req.app.locals.skills;
    res.locals.education = req.app.locals.education;
    res.locals.projects = req.app.locals.projects;
    res.locals.password = req.app.locals.password;
    res.locals.greeting = req.app.locals.greeting;
    res.locals.footerData = req.app.locals.footerData;
    next();
});


// ================= IMPORT ROUTERS =================
import AdminRouter from "./routes/admin.js";
import PublicportfolioRouter from "./routes/publicportfolio.js";
import PortfolioRouter from "./routes/portfolio.js";

// import portfolioskillRouter from "./routes/portfolioskill.js";
import skillsRouter from "./routes/portfolioskill/skills.js";
import coreskillsRouter from "./routes/portfolioskill/coreskills.js";
import topicsRouter from "./routes/portfolioskill/topics.js";

import portfolioprojectRouter from "./routes/portfolioproject.js";



// ================= ROOT LEVEL ROUTES =================
// Handles base routes like "/", "/home", admin, public portfolio
app.use("/", AdminRouter);
app.use("/", PublicportfolioRouter);



// ================= PORTFOLIO BASE ROUTE =================

// 1. Project routes (MOST specific)
app.use("/portfolio/projects", portfolioprojectRouter);

// 2. Skill → Topic → Core routes (dynamic but specific)
app.use("/portfolio/core", coreskillsRouter);
app.use("/portfolio/topics", topicsRouter);
app.use("/portfolio/skills", skillsRouter);

// 3. GENERAL portfolio route (LEAST specific — MUST BE LAST)
app.use("/portfolio", PortfolioRouter);




// ================= DEFAULT ROUTES =================

// Redirect root to home
app.get("/", (req, res) => {
    res.redirect("/home");
});

// Home page
app.get("/home", (req, res) => {
    res.render("home/home.ejs");
});


// ================= SERVER START =================
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});