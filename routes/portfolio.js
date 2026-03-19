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
router.post("/addskill", (req, res) => {
    let newskill = req.body.skill;

    res.locals.skills.push({
        skillName: newskill,
        topics: []
    });

    res.redirect("/portfolio#skillsSection");
});

router.get("/editintro", (req, res) => {
    res.render("editintro.ejs", {
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
  res.render("editeducation.ejs", {
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
  res.render("editeducation.ejs", {
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

router.get("/projects/addproject", (req, res) => {
  res.render("addproject.ejs", {
    projects: res.locals.projects,
    skills: res.locals.skills,
    education: res.locals.education
  });
});

router.get("/projects/deleteproject/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (!isNaN(index) && index >= 0 && index < res.locals.projects.length) {
    res.locals.projects.splice(index, 1);
  }

  res.redirect("/portfolio");
});


router.post("/projects/addproject", (req, res) => {
  const {
    projectName, projectSlug, description, image,
    githubLink, liveLink,
    languages, frameworks, databases, tools,
    role, status, startDate, endDate,
    features, highlights
  } = req.body;

  res.locals.projects.push({
    projectName,
    projectSlug,
    description,
    image,
    githubLink,
    liveLink: liveLink || null,

    techStack: {
      languages: languages ? languages.split(",").map(x => x.trim()) : [],
      frameworks: frameworks ? frameworks.split(",").map(x => x.trim()) : [],
      databases: databases ? databases.split(",").map(x => x.trim()) : [],
      tools: tools ? tools.split(",").map(x => x.trim()) : []
    },

    features: features ? features.split(",").map(x => x.trim()) : [],
    highlights: highlights ? highlights.split(",").map(x => x.trim()) : [],

    role,
    startDate,
    endDate,
    status
  });

  res.redirect("/portfolio");
});


export default router;