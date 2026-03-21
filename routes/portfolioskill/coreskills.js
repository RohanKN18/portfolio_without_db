import express from "express";
const router = express.Router({ mergeParams: true });

import { getSkillAndTopic } from "../../utils/dataHelpers.js";


// ================= ADD CORE SKILL =================
// ⚠️ STATIC ROUTES FIRST







// ================= EDIT CORE SKILL =================

router.get("/:skillSlug/:topic/:core/edit", (req, res) => {
    const { skillSlug, topic, core } = req.params;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Core skill not found for edit get");
    }

    res.render("admin/skill/editcore.ejs", {
        selectedSkill,
        selectedTopic,
        core
    });
});


// UPDATE core skill
router.post("/:skillSlug/:topic/:core/edit", (req, res) => {
    const { skillSlug, topic, core } = req.params;
    const { coreName } = req.body;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Core skill not found for update post");
    }

    const index = selectedTopic.coreSkills.indexOf(core);

    if (index !== -1) {
        selectedTopic.coreSkills[index] = coreName;
    }

    res.redirect(`/portfolio/skills/${skillSlug}#skillsSection`);
});
 

// ================= DELETE CORE SKILL =================

router.delete("/:skillSlug/:topic/:core/", (req, res) => {
    const { skillSlug, topic, core } = req.params;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Core skill not found to delete");
    }

    selectedTopic.coreSkills =
        selectedTopic.coreSkills.filter(c => c !== core);

    res.redirect(`/portfolio/skills/${skillSlug}#skillsSection`);
});


export default router;