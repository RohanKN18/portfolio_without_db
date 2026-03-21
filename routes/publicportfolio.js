import express from "express";
const router = express.Router();

// GET all portfolio
router.get("/publicportfolio", (req, res) => {
    res.render("public/publicportfolio.ejs", { 
        projects: res.locals.projects,
        skills: res.locals.skills,
        education: res.locals.education
    });
});

// GET project detail
router.get("/publicportfolio/projects/:slug", (req, res) => {
    const { slug } = req.params;

    const project = res.locals.projects.find(
        p => p.projectSlug === slug
    );

    if (!project) return res.status(404).send("Project not found");

    res.render("public/publicprojectdetails.ejs", { project });
});

// GET skill detail
router.get("/publicportfolio/:skill", (req, res) => {
    const { skill } = req.params;

    const selectedSkill = res.locals.skills.find(
        s => s.skillName === skill
    );

    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }

    res.render("public/publicskillindetail.ejs", {
        projects: res.locals.projects,
        skills: res.locals.skills,
        education: res.locals.education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});



export default router;