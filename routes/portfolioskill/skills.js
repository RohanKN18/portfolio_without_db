import express from "express";
const router = express.Router({ mergeParams: true });

import { generateSlug } from "../../utils/slugify.js";
import { getSkill } from "../../utils/dataHelpers.js";

// GET add topic page
router.get("/:skillSlug/addtopics", (req, res) => {
    const { skillSlug } = req.params;

    const selectedSkill = getSkill(res, skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found for topic add");
    }

    res.render("admin/skill/addtopics.ejs", {
        selectedSkill
    });
});


// POST add topic
router.post("/:skillSlug/addtopics", (req, res) => {
    const { skillSlug } = req.params;
    const { topic } = req.body;

    const selectedSkill = getSkill(res, skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found for post add");
    }

    if (!topic || !topic.trim()) {
        return res.send("Topic name is required");
    }

    selectedSkill.topics.push({
        topicName: topic,
        coreSkills: []
    });

    res.redirect(`/portfolio/skills/${skillSlug}#skillsSection`);
});

 


// ================= EDIT SKILL =================

// GET edit page
router.get("/:skillSlug/edit", (req, res) => {
    const { skillSlug } = req.params;

    const selectedSkill = getSkill(res, skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found for editing");
    }

    res.render("admin/skill/editskill.ejs", { selectedSkill });
});


// POST save edit
router.post("/:skillSlug/edit", (req, res) => {
    const { skillSlug } = req.params;
    const { skillName } = req.body;

    const selectedSkill = getSkill(res, skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found for post editing");
    }

    // update
    selectedSkill.skillName = skillName;
    selectedSkill.slug = generateSlug(skillName);

    res.redirect(`/portfolio/skills/${selectedSkill.slug}#skillsSection`);
});


// ================= DELETE SKILL =================

router.delete("/:skillSlug", (req, res) => {
    const { skillSlug } = req.params;

    req.app.locals.skills = req.app.locals.skills.filter(
        s => s.slug !== skillSlug
    );

    res.redirect("/portfolio#skillsSection");
});


// ================= SKILL DETAIL =================

router.get("/:skillSlug", (req, res) => {
    const { skillSlug } = req.params;

    const selectedSkill = getSkill(res, skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found for read");
    }

    res.render("admin/skillindetail.ejs", {
        selectedSkill,
        scrollTo: "skillsSection"
    });
});


export default router;