const express = require("express");
const slugify = require("slugify");
const router = express.Router();
const Category = require("../database/models/category");

router.get("/admin/categories", async (req, res) => {
    const categories = await Category.findAll();
    res.render("admin/categories/index", {categories: categories});    
});

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", async (req, res) => {
    const title = req.body.title;
    
    if (title != undefined && title != ''){
        try{
            await Category.create({
                title: title,
                slug: slugify(title)
            });
            res.redirect("/admin/categories");
        }catch(msgError){
            console.log(msgError);
        }
    }else{
        res.redirect('/admin/categories/new');
    }
});

router.get("/admin/categories/edit/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(id)){
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if (category != undefined){
            res.render("admin/categories/edit", {category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    })
});

router.post("/categories/update", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    Category.update({title: title, slug: slugify(title)}, {
        where:{
            id:id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    })
});

router.post("/categories/delete", async (req, res) => {
    const id = req.body.id;

    if (id != undefined){
        if (!isNaN(id)){
            await Category.destroy({
                where: {id: id}
            });
        }        
    }
    res.redirect("/admin/categories");    
});

module.exports = router;