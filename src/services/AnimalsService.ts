import { promises as fs } from 'fs'
import path from 'path'
const filePath = path.resolve(__dirname, "../data/zoo.json");
import {Animal} from "../models/Animal"

class AnimalsService {
   async getAllAnimals() {
        try{
            // console.log("Wczytywanie danych z " + filePath);
            const data = await fs.readFile(filePath, 'utf8')
            // return JSON.parse(data.replace(/^\uFEFF/, "")); //BOM
            return JSON.parse(data)
        }catch(err){
            if(err instanceof Error){
                throw new Error(`Bład przy pobieraniu zoo.json, ${err.message}`);
            }
        }
    }
    async saveData(animals: Animal){
        try{
            await fs.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf8')
        }
        catch(err){
            if(err instanceof Error){
                throw new Error("Nie udało się zapisać danych w zoo.json " + err.message)
            }
        }
    }
   async getAnimalsById(id: number){
        try{
            const animals = await this.getAllAnimals()
            return animals.find((animal: Animal) => animal.id === id)
        }catch(err){
            if(err instanceof Error){
                throw new Error("Nie znaleziono zwierzęta o tym ID")
            }
        }
    }
    async getEndangeredAnimals(){
        try{
            const animals = await this.getAllAnimals()
            return animals.filter((animal: Animal) => animal.isEndangered)
        }
        catch(err){
            if(err instanceof Error){
                throw new Error("Nie udało się znaleźć zagrożonych gatunków")
            }
        }
    }
    async getAnimalsByHabitat(habitat: string){
        try{
            const animals = await this.getAllAnimals()
            return animals.filter((animal: Animal) => animal.habitat.toLowerCase() === habitat.toLowerCase())
        }catch(err){
            if(err instanceof Error){
                throw new Error("Nie znaleziono środowiska")
            }
        }
    }
    async getAnimalsBySpieces(species: string){
        try{
            const animals = await this.getAllAnimals()
            return animals.filter((animal: Animal )=> animal.species.toLowerCase() === species.toLowerCase())
        }catch(err){
            if(err instanceof Error){
                throw new Error("Nie znaleziono gatunku")
            }
        }
    }
        addAnimal = async (animal: Animal) => {
        const animals = await this.getAllAnimals()
        const newAnimal = {
            ...animal,
            id: animals.length > 0 ? animals[animals.length - 1] + 1 : 1,
        }
        animals.push(newAnimal)
        await this.saveData(animals)
        return newAnimal
    }
    updateAnimal = async (id: number, animal: Animal) => {
        const animals = await this.getAllAnimals()
        const index = animals.findIndex((animal: Animal) => animal.id === id)

        if(index < 0) throw new Error ("Zwierze nie istnieje")

        animals[index] = {...animals[index], ...animal}
        await this.saveData(animals)
        return animals[index]
    }
    deleteAnimal = async(id: number) => {
        const animals = await this.getAllAnimals()
        const index = animals.findIndex((animal: Animal) => animal.id === id)

        if(index < 0) throw new Error ("Zwierze nie istnieje")

        animals.splice(index, 1)
        await this.saveData(animals)
        return true;
    }
}
export default AnimalsService;