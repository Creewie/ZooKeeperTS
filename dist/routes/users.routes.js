"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AnimalsController_1 = __importDefault(require("../controllers/AnimalsController"));
const userRouter = express_1.default.Router();
userRouter.get('/', (req, res) => {
    res.send("Następne strony:<br> " +
        "<a href='http://localhost:3000/animals'>Wszystkie zwierzęta</a><br>");
});
userRouter.get("/animals", AnimalsController_1.default.getAllAnimals);
userRouter.get("/animals/endangered/", AnimalsController_1.default.getEndangeredAnimals);
userRouter.get("/animals/habitat/:habitat", AnimalsController_1.default.getAnimalsByHabitat);
userRouter.get("/animals/species/:species", AnimalsController_1.default.getAnimalsBySpieces);
userRouter.post("/animals", AnimalsController_1.default.addAnimal);
userRouter.put("/animals/:id", AnimalsController_1.default.updateAnimal);
userRouter.delete("/animals/:id", AnimalsController_1.default.deleteAnimal);
userRouter.get("/animals/:id", AnimalsController_1.default.getAnimalsById);
