import express from "express";
const router = express.Router();


router.get("/loginform",(req,res)=>{
    res.render("login/loginpage.ejs");
});
router.post("/login", (req, res) => {
    if (req.body.password === res.locals.password) {
        res.redirect("/portfolio");
    } else {
        res.render("login/loginfail.ejs");
    }
});



router.get("/editfooter", (req, res) => {
    res.render("admin/footer/editfooter.ejs");
});


router.post("/editfooter", (req, res) => {

    const data = res.locals.footerData;

    if (data) {
        data.contact.email = req.body.email;
        data.contact.phone = req.body.phone;

        data.socialLinks.forEach((link, index) => {
            if (req.body.socialLinks[index]) {
                link.url = req.body.socialLinks[index].url;
            }
        });

        data.copyright.year = req.body.year;
        data.copyright.name = req.body.name;
    }

    res.redirect("/portfolio");
});
export default router;