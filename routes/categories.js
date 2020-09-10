const express = require("express");
const router = express.Router();

const Joi = require("joi");
const validateWith = require("../middleware/validation")

const categoriesStore = require("../store/categories");
const validation = require("../middleware/validation");

router.get("/", async (req, res) => {

  let categories = []
  try {
    categories = await categoriesStore.getCategories(); 
  } catch (error) {
  }
  // console.log(categories);
  res.send(categories);
});

const schema = {
  id:Joi.string().required(),
  name:Joi.string().required(),
  icon: Joi.string().required(),
  backgroundColor: Joi.string().required(),
  color:Joi.string().required(),
}
router.post("/", 
            [
              validateWith(schema),
            ] ,
            async(req,res) =>{
              let category = {
                id:req.body.id,
                name:req.body.name,
                icon: req.body.icon,
                backgroundColor: req.body.backgroundColor,
                color:req.body.color,
              }
              try{
                await categoriesStore.addCategory(category);
                res.status(201).send(category);
              }catch(error){
                res.status(500).send(error);
              }
});
module.exports = router;
