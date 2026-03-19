import express from "express";
const router = express.Router();

// project detail
router.get("/:projectSlug", (req, res) => {
    const { projectSlug } = req.params;

    const selectedProject = res.locals.projects.find(
        p => p.projectSlug === projectSlug
    );

    if (!selectedProject) {
        return res.status(404).send("Project not found");
    }

    res.render("projectindetail.ejs", {
        project: selectedProject,
        skills: res.locals.skills,
        education: res.locals.education,
        projects: res.locals.projects
    });
});

// edit page
router.get("/:projectSlug/edit", (req, res) => {
    const { projectSlug } = req.params;

    const selectedProject = res.locals.projects.find(
        p => p.projectSlug === projectSlug
    );

    if (!selectedProject) {
        return res.status(404).send("Project not found");
    }

    res.render("editproject.ejs", {
        project: selectedProject
    });
});


router.post("/:projectSlug/edit", (req, res) => {
    const { projectSlug } = req.params;

    const project = res.locals.projects.find(
        p => p.projectSlug === projectSlug
    );

    if (!project) return res.send("Project not found");

    // BASIC FIELDS
    project.projectName = req.body.projectName;
    project.projectSlug = req.body.projectSlug;
    project.description = req.body.description;
    project.image = req.body.image;
    project.githubLink = req.body.githubLink;
    project.liveLink = req.body.liveLink;
    project.role = req.body.role;
    project.status = req.body.status;
    project.startDate = req.body.startDate;
    project.endDate = req.body.endDate;

    // ARRAY FIELDS
    project.techStack.languages = req.body.languages.split(",").map(s => s.trim());
    project.techStack.frameworks = req.body.frameworks.split(",").map(s => s.trim());
    project.techStack.databases = req.body.databases.split(",").map(s => s.trim());
    project.techStack.tools = req.body.tools.split(",").map(s => s.trim());

    project.features = req.body.features.split(",").map(s => s.trim());
    project.highlights = req.body.highlights.split(",").map(s => s.trim());

    res.redirect(`/portfolio/projects/${project.projectSlug}`);
});

export default router;