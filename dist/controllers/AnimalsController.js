"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalsService_1 = __importDefault(require("../services/AnimalsService"));
const animalsService = new AnimalsService_1.default(); // Utworzenie instancji klasy
class AnimalsController {
}
_a = AnimalsController;
AnimalsController.getAllAnimals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield animalsService.getAllAnimals(); // Użycie instancji
        res.json({ animals });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się wydobyć zwierząt z ZOO " + err.message });
        }
    }
});
AnimalsController.getAnimalsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const animal = yield animalsService.getAnimalsById(id);
        res.json(animal);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się znaleźć zwierzaka o tym ID: " + err.message });
        }
    }
});
AnimalsController.getEndangeredAnimals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animals = yield animalsService.getEndangeredAnimals();
        res.json(animals);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się znaleźć zagrożonych gatunków " + err.message });
        }
    }
});
AnimalsController.getAnimalsByHabitat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitat = req.params.habitat;
        const animals = yield animalsService.getAnimalsByHabitat(habitat);
        res.json(animals);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się znaleźć środowiska: " + err.message });
        }
    }
});
AnimalsController.getAnimalsBySpieces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const species = req.params.species;
        const animals = yield animalsService.getAnimalsBySpieces(species);
        res.json(animals);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się znaleźć takiego gatunku: " + err.message });
        }
    }
});
AnimalsController.addAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animal = req.body;
        console.log(animal);
        const newAnimal = yield animalsService.addAnimal(animal);
        res.status(201).json(newAnimal);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się dodać zwierzaka: " + err.message });
        }
    }
});
AnimalsController.updateAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const animalData = req.body;
        const updatedAnimal = yield animalsService.updateAnimal(id, animalData);
        if (!updatedAnimal) {
            res.status(400).json({ error: "Nie udało się edytować" });
        }
        res.json(updatedAnimal);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się zmienić zwierzaka: " + err.message });
        }
    }
});
AnimalsController.deleteAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleted = yield animalsService.deleteAnimal(id);
        if (!deleted) {
            res.status(404).json({ error: "Nie udało się usunąć" });
        }
        res.status(204).json(deleted);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: "Nie udało się usunąć zwierzaka: " + err.message });
        }
    }
});
exports.default = AnimalsController;
