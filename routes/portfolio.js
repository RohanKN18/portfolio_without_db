import express from "express";
const router = express.Router();

import { generateSlug } from "../utils/slugify.js";


// ================= PORTFOLIO =================

// GET portfolio
router.get("/", (req, res) => {
    res.render("admin/portfolio.ejs");
});


// ================= ADD SKILL =================

// GET add skill page
router.get("/addskill", (req, res) => {
    res.render("admin/skill/addskill.ejs");
});


// POST add skill
router.post("/addskill", (req, res) => {
    const { skill } = req.body;

    // 🔥 prevent empty input
    if (!skill || !skill.trim()) {
        return res.send("Skill name is required");
    }

    // 🔥 generate unique slug
    let baseSlug = generateSlug(skill);
    let slug = baseSlug;
    let count = 1;

    while (req.app.locals.skills.find(s => s.slug === slug)) {
        slug = `${baseSlug}-${count++}`;
    }

    const newSkill = {
        skillName: skill,
        slug,
        topics: []
    };

    req.app.locals.skills.push(newSkill);

    res.redirect("/portfolio#skillsSection");
});


router.get("/editintro", (req, res) => {
    res.render("admin/intro/editintro.ejs", {
         greeting: res.locals.greeting,
        skills: res.locals.skills,
        education: res.locals.education,
        projects: res.locals.projects
    });
});

router.post("/editintro", (req, res) => {
    const { hi, name, title, description } = req.body;

    // Update the object
    res.locals.greeting.hi = hi;
    res.locals.greeting.name = name;
    res.locals.greeting.title = title;
    res.locals.greeting.description = description;

    console.log("Updated greeting:", res.locals.greeting);

    // Redirect to portfolio
    res.redirect("/portfolio");
});



router.get("/editeducation", (req, res) => {
  res.render("admin/education/editeducation.ejs", {
    education: res.locals.education
  });
});

router.post("/editeducation", (req, res) => {
  const updatedEducation = req.body.education || [];

  updatedEducation.forEach((item, index) => {
    if (res.locals.education[index]) {
      res.locals.education[index].level = item.level;
      res.locals.education[index].school = item.school;
      res.locals.education[index].score = item.score;
    }
  });

  res.redirect("/portfolio");
});


router.get("/editeducation/addeducation", (req, res) => {

  // Add empty entry
  res.locals.education.push({
    id: Date.now(),
    level: "",
    school: "",
    score: ""
  });

  // Render same page with updated data
  res.render("admin/education/editeducation.ejs", {
    education: res.locals.education
  });
});


router.get("/editeducation/deleteeducation/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (!isNaN(index) && index >= 0 && index < res.locals.education.length) {
    res.locals.education.splice(index, 1);
  }

  res.redirect("/portfolio/editeducation");
});



export default router;