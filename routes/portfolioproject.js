import express from "express";
const router = express.Router();

import { getProject } from "../utils/dataHelpers.js";


// ================= ADD PROJECT =================
router.get("/addproject", (req, res) => {
    res.render("admin/project/addproject.ejs", {
        projects: req.app.locals.projects,
        skills: req.app.locals.skills,
        education: req.app.locals.education
    });
});

router.post("/addproject", (req, res) => {
    const {
        projectName, projectSlug, description, image,
        githubLink, liveLink,
        languages, frameworks, databases, tools,
        role, status, startDate, endDate,
        features, highlights
    } = req.body;

    req.app.locals.projects.push({
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


// ================= EDIT =================
router.get("/:projectSlug/edit", (req, res) => {
    const project = getProject(req, req.params.projectSlug);

    if (!project) return res.status(404).send("Project not found");

    res.render("admin/project/editproject.ejs", { project });
});

router.post("/:projectSlug/edit", (req, res) => {
    const project = getProject(req, req.params.projectSlug);

    if (!project) return res.status(404).send("Project not found");

    Object.assign(project, {
        projectName: req.body.projectName,
        projectSlug: req.body.projectSlug,
        description: req.body.description,
        image: req.body.image,
        githubLink: req.body.githubLink,
        liveLink: req.body.liveLink,
        role: req.body.role,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    project.techStack = {
        languages: req.body.languages?.split(",").map(s => s.trim()) || [],
        frameworks: req.body.frameworks?.split(",").map(s => s.trim()) || [],
        databases: req.body.databases?.split(",").map(s => s.trim()) || [],
        tools: req.body.tools?.split(",").map(s => s.trim()) || []
    };

    project.features = req.body.features?.split(",").map(s => s.trim()) || [];
    project.highlights = req.body.highlights?.split(",").map(s => s.trim()) || [];

    res.redirect(`/portfolio/projects/${project.projectSlug}`);
});


// ================= DELETE =================
router.delete("/:projectSlug", (req, res) => {
    console.log("DELETE HIT");

    const { projectSlug } = req.params;

    req.app.locals.projects = req.app.locals.projects.filter(
        project => project.projectSlug !== projectSlug
    );

    res.redirect("/portfolio");
});


// ================= VIEW =================
router.get("/:projectSlug", (req, res) => {
    const project = getProject(req, req.params.projectSlug);

    if (!project) return res.status(404).send("Project not found");

    res.render("admin/projectindetail.ejs", {
        project,
        skills: req.app.locals.skills,
        education: req.app.locals.education,
        projects: req.app.locals.projects
    });
});

export default router;