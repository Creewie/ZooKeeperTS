import express from "express";
import AnimalsController from "../controllers/AnimalsController";

const animalsRouter = express.Router();

animalsRouter.get("/animals", AnimalsController.getAllAnimals);
animalsRouter.get("/animals/endangered", AnimalsController.getEndangeredAnimals);
animalsRouter.get("/animals/habitat/:habitat", AnimalsController.getAnimalsByHabitat);
animalsRouter.get("/animals/species/:species", AnimalsController.getAnimalsBySpieces);
animalsRouter.post("/animals", AnimalsController.addAnimal);
animalsRouter.put("/animals/:id", AnimalsController.updateAnimal);
animalsRouter.delete("/animals/:id", AnimalsController.deleteAnimal);
animalsRouter.get("/animals/:id", AnimalsController.getAnimalsById);

export default animalsRouter;
