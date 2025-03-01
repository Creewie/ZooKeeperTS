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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.resolve("data", "zoo.json");
class AnimalsService {
    constructor() {
        this.addAnimal = (animal) => __awaiter(this, void 0, void 0, function* () {
            const animals = yield this.getAllAnimals();
            const newAnimal = Object.assign(Object.assign({}, animal), { id: animals.length > 0 ? animals[animals.length - 1] + 1 : 1 });
            animals.push(newAnimal);
            yield this.saveData(animals);
            return newAnimal;
        });
        this.updateAnimal = (id, animal) => __awaiter(this, void 0, void 0, function* () {
            const animals = yield this.getAllAnimals();
            const index = animals.findIndex((animal) => animal.id === id);
            if (index < 0)
                throw new Error("Zwierze nie istnieje");
            animals[index] = Object.assign(Object.assign({}, animals[index]), animal);
            yield this.saveData(animals);
            return animals[index];
        });
        this.deleteAnimal = (id) => __awaiter(this, void 0, void 0, function* () {
            const animals = yield this.getAllAnimals();
            const index = animals.findIndex((animal) => animal.id === id);
            if (index < 0)
                throw new Error("Zwierze nie istnieje");
            animals.splice(index, 1);
            yield this.saveData(animals);
            return true;
        });
    }
    getAllAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("Wczytywanie danych z " + filePath);
                const data = yield fs_1.promises.readFile(filePath, 'utf8');
                // return JSON.parse(data.replace(/^\uFEFF/, "")); //BOM
                return JSON.parse(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Bład przy pobieraniu zoo.json, ${err.message}`);
                }
            }
        });
    }
    saveData(animals) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf8');
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Nie udało się zapisać danych w zoo.json " + err.message);
                }
            }
        });
    }
    getAnimalsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animals = yield this.getAllAnimals();
                return animals.find((animal) => animal.id === id);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Nie znaleziono zwierzęta o tym ID");
                }
            }
        });
    }
    getEndangeredAnimals() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animals = yield this.getAllAnimals();
                return animals.filter((animal) => animal.isEndangered);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Nie udało się znaleźć zagrożonych gatunków");
                }
            }
        });
    }
    getAnimalsByHabitat(habitat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animals = yield this.getAllAnimals();
                return animals.filter((animal) => animal.habitat.toLowerCase() === habitat.toLowerCase());
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Nie znaleziono środowiska");
                }
            }
        });
    }
    getAnimalsBySpieces(species) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animals = yield this.getAllAnimals();
                return animals.filter((animal) => animal.species.toLowerCase() === species.toLowerCase());
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error("Nie znaleziono gatunku");
                }
            }
        });
    }
}
exports.default = AnimalsService;
