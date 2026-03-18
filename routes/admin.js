import express from "express";
const router = express.Router();


router.get("/loginform",(req,res)=>{
    res.render("loginpage.ejs");
});
router.post("/login", (req, res) => {
    if (req.body.password === res.locals.password) {
        res.redirect("/portfolio");
    } else {
        res.render("loginfail.ejs");
    }
});

export default router;