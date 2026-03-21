import express from "express";
const router = express.Router({ mergeParams: true });

import { getSkill, getSkillAndTopic } from "../../utils/dataHelpers.js";


// ================= ADD TOPIC =================
// ⚠️ ALWAYS KEEP STATIC ROUTES FIRST




// ================= EDIT TOPIC =================

// GET edit topic page
router.get("/:skillSlug/:topic/edit", (req, res) => {
    const { skillSlug, topic } = req.params;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Topic not found for edit");
    }

    res.render("admin/skill/edittopic.ejs", {
        selectedSkill,
        selectedTopic
    });
});


// UPDATE topic
router.put("/:skillSlug/:topic", (req, res) => {
    const { skillSlug, topic } = req.params;
    const { topicName } = req.body;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Topic not found for post edit");
    }

    selectedTopic.topicName = topicName;

    res.redirect(`/portfolio/skills/${skillSlug}#skillsSection`);
});


// ================= DELETE TOPIC =================

router.delete("/:skillSlug/:topic", (req, res) => {
    const { skillSlug, topic } = req.params;

    const selectedSkill = getSkill(res, skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found for delete");
    }

    selectedSkill.topics = selectedSkill.topics.filter(
        t => t.topicName !== topic
    );

    res.redirect(`/portfolio/skills/${skillSlug}#skillsSection`);
});

// GET add core skill page
router.get("/:skillSlug/:topic/addcoreskill", (req, res) => {
    const { skillSlug, topic } = req.params;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Topic not found for add get");
    }

    res.render("admin/skill/addcoreskill.ejs", {
        selectedSkill,
        selectedTopic
    });
});
// POST add core skill
router.post("/:skillSlug/:topic/addcoreskill", (req, res) => {
    const { skillSlug, topic } = req.params;
    const { coreSkill } = req.body;

    const { selectedSkill, selectedTopic } =
        getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) {
        return res.status(404).send("Topic not found for add post");
    }

    if (!coreSkill || !coreSkill.trim()) {
        return res.send("Core skill name is required");
    }

    selectedTopic.coreSkills.push(coreSkill);

    res.redirect(`/portfolio/skills/${skillSlug}#skillsSection`);
});













export default router;