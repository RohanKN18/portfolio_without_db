import express from "express";
const router = express.Router();

// GET portfolio
router.get("", (req, res) => {
    res.render("portfolio.ejs", {
        skills: res.locals.skills,
        education: res.locals.education,
        projects: res.locals.projects
    });
});

// ADD skill (form)
router.get("/addskill", (req, res) => {
    res.render("addskill.ejs", {
        projects: res.locals.projects,
        skills: res.locals.skills,
        education: res.locals.education,
        scrollTo: "skillsSection"
    });
});

// ADD skill (post)
router.post("/portfolio/addskill", (req, res) => {
    let newskill = req.body.skill;

    res.locals.skills.push({
        skillName: newskill,
        topics: []
    });

    res.redirect("/portfolio#skillsSection");
});

export default router;