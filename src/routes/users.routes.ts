import express, { Request, Response } from 'express';
import AnimalsController from "../controllers/AnimalsController";

const userRouter = express.Router();

userRouter.get('/',(req,res)=>{
    res.send("Następne strony:<br> " +
        "<a href='http://localhost:3000/animals'>Wszystkie zwierzęta</a><br>")
})
userRouter.get("/animals", AnimalsController.getAllAnimals)
userRouter.get("/animals/endangered/", AnimalsController.getEndangeredAnimals)
userRouter.get("/animals/habitat/:habitat", AnimalsController.getAnimalsByHabitat)
userRouter.get("/animals/species/:species", AnimalsController.getAnimalsBySpieces)
userRouter.post("/animals", AnimalsController.addAnimal)
userRouter.put("/animals/:id", AnimalsController.updateAnimal)
userRouter.delete("/animals/:id", AnimalsController.deleteAnimal)
userRouter.get("/animals/:id", AnimalsController.getAnimalsById)