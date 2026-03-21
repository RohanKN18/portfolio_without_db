// ================= SKILL HELPERS =================

export function getSkill(res, skillSlug) {
    return res.locals.skills.find(s => s.slug === skillSlug);
}

export function getSkillAndTopic(res, skillSlug, topic) {
    const selectedSkill = getSkill(res, skillSlug);

    const selectedTopic = selectedSkill?.topics.find(
        t => t.topicName === topic
    );

    return { selectedSkill, selectedTopic };
}


// ================= PROJECT HELPERS =================

export function getProject(req, slug) {
    return req.app.locals.projects.find(
        p => p.projectSlug === slug
    );
}