import express from "express";
const router = express.Router({ mergeParams: true });

// helper function (VERY IMPORTANT - avoids repetition)
function getSkillAndTopic(res, skillSlug, topic) {
    const selectedSkill = res.locals.skills.find(s => s.slug === skillSlug);
    const selectedTopic = selectedSkill?.topics.find(t => t.topicName === topic);
    return { selectedSkill, selectedTopic };
}


// ================= CORE SKILL =================

// edit core skill
router.get("/:topic/:core/edit", (req, res) => {
    const { skillSlug, topic, core } = req.params;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) return res.send("Not found");

    res.render("editcore.ejs", {
        selectedSkill,
        selectedTopic,
        core
    });
});

router.post("/:topic/:core/edit", (req, res) => {
    const { skillSlug, topic, core } = req.params;
    const newName = req.body.coreName;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) return res.send("Not found");

    const index = selectedTopic.coreSkills.indexOf(core);
    if (index !== -1) {
        selectedTopic.coreSkills[index] = newName;
    }

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});

// delete core skill
router.delete("/:topic/:core/delete", (req, res) => {
    const { skillSlug, topic, core } = req.params;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) return res.send("Not found");

    selectedTopic.coreSkills =
        selectedTopic.coreSkills.filter(c => c !== core);

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});


// add core skill
router.get("/:topic/addcoreskill", (req, res) => {
    const { skillSlug, topic } = req.params;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) return res.send("Not found");

    res.render("addcoreskill.ejs", {
        selectedSkill,
        selectedTopic,
        projects: res.locals.projects,
        skills: res.locals.skills,
        education: res.locals.education,
        scrollTo: "skillsSection"
    });
});

router.post("/:topic/addcoreskill", (req, res) => {
    const { skillSlug, topic } = req.params;
    const coreSkillName = req.body.coreSkill;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) return res.send("Not found");

    selectedTopic.coreSkills.push(coreSkillName);

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});


// ================= TOPIC =================

// edit topic
router.get("/:topic/edit", (req, res) => {
    const { skillSlug, topic } = req.params;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (!selectedSkill || !selectedTopic) return res.send("Not found");

    res.render("edittopic.ejs", {
        selectedSkill,
        selectedTopic
    });
});

router.put("/:topic", (req, res) => {
    const { skillSlug, topic } = req.params;
    const newName = req.body.topicName;

    const { selectedSkill, selectedTopic } = getSkillAndTopic(res, skillSlug, topic);

    if (selectedTopic) {
        selectedTopic.topicName = newName;
    }

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});

// delete topic
router.delete("/:topic", (req, res) => {
    const { skillSlug, topic } = req.params;

    const selectedSkill = res.locals.skills.find(s => s.slug === skillSlug);
    if (!selectedSkill) return res.send("Skill not found");

    selectedSkill.topics =
        selectedSkill.topics.filter(t => t.topicName !== topic);

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});

// add topic
router.get("/addtopics", (req, res) => {
    const { skillSlug } = req.params;

    const selectedSkill = res.locals.skills.find(s => s.slug === skillSlug);

    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }

    res.render("addtopics.ejs", {
        projects: res.locals.projects,
        skills: res.locals.skills,
        education: res.locals.education,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});

router.post("/addtopics", (req, res) => {
    const { skillSlug } = req.params;
    const topicName = req.body.topic;

    const selectedSkill = res.locals.skills.find(s => s.slug === skillSlug);

    if (selectedSkill) {
        selectedSkill.topics.push({
            topicName,
            coreSkills: []
        });
    }

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});


// ================= SKILL =================

// edit skill
router.get("/edit", (req, res) => {
    const { skillSlug } = req.params;

    const selectedSkill = res.locals.skills.find(s => s.slug === skillSlug);
    if (!selectedSkill) return res.send("Skill not found");

    res.render("editskill.ejs", {
        selectedSkill,
        projects: res.locals.projects,
        skills: res.locals.skills,
        education: res.locals.education
    });
});

router.post("/edit", (req, res) => {
    const { skillSlug } = req.params;
    const newName = req.body.skillName;

    const selectedSkill = res.locals.skills.find(s => s.slug === skillSlug);
    if (!selectedSkill) return res.send("Skill not found");

    selectedSkill.skillName = newName;

    res.redirect(`/portfolio/${skillSlug}#skillsSection`);
});

// delete skill
router.delete("/delete", (req, res) => {
    const { skillSlug } = req.params;

    res.locals.skills = res.locals.skills.filter(
        s => s.slug !== skillSlug
    );

    res.redirect("/portfolio");
});


// ================= SKILL DETAIL =================

router.get("/", (req, res) => {
    const { skillSlug } = req.params;

    const selectedSkill = res.locals.skills.find(
        s => s.slug === skillSlug
    );

    if (!selectedSkill) {
        return res.status(404).send("Skill not found");
    }

    res.render("skillindetail.ejs", {
        skills: res.locals.skills,
        education: res.locals.education,
        projects: res.locals.projects,
        selectedSkill,
        scrollTo: "skillsSection"
    });
});

export default router;