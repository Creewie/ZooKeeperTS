import { Request, Response } from "express";
import AnimalsService from "../services/AnimalsService";

const animalsService = new AnimalsService(); // Utworzenie instancji klasy

class AnimalsController {
    static getAllAnimals = async (req: Request, res: Response) => {
        try{
            const animals = await animalsService.getAllAnimals(); // Użycie instancji
            res.json({animals});
        }catch(err){
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się wydobyć zwierząt z ZOO " + err.message});
            }
        }
    }

    static getAnimalsById = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const animal = await animalsService.getAnimalsById(id);
            res.json(animal);
        }catch(err){
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się znaleźć zwierzaka o tym ID: " + err.message});
            }
        }
    }

    static getEndangeredAnimals = async (req: Request, res: Response) => {
        try{
            const animals = await animalsService.getEndangeredAnimals();
            res.json(animals);
        }
        catch (err) {
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się znaleźć zagrożonych gatunków " + err.message});
            }
        }
    }

    static getAnimalsByHabitat = async (req: Request, res: Response) => {
        try{
            const habitat = req.params.habitat;
            const animals = await animalsService.getAnimalsByHabitat(habitat);
            res.json(animals);
        }catch(err){
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się znaleźć środowiska: " + err.message});
            }
        }
    }

    static getAnimalsBySpieces = async (req: Request, res: Response) => {
        try{
            const species = req.params.species;
            const animals = await animalsService.getAnimalsBySpieces(species);
            res.json(animals);
        }catch(err){
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się znaleźć takiego gatunku: " + err.message});
            }
        }
    }

    static addAnimal = async (req: Request, res: Response) => {
        try{
            const animal = req.body;
            console.log(animal);
            const newAnimal = await animalsService.addAnimal(animal);
            res.status(201).json(newAnimal);
        }
        catch (err) {
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się dodać zwierzaka: " + err.message});
            }
        }
    }

    static updateAnimal = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const animalData = req.body;
            const updatedAnimal = await animalsService.updateAnimal(id, animalData);
            if(!updatedAnimal) {
                res.status(400).json({error: "Nie udało się edytować"});
            }
            res.json(updatedAnimal);
        }catch(err){
            if(err instanceof Error){
                res.status(500).json({error: "Nie udało się zmienić zwierzaka: " + err.message});
            }
        }
    }

    static deleteAnimal = async (req: Request, res: Response) => {
        try{
            const id = parseInt(req.params.id);
            const deleted = await animalsService.deleteAnimal(id);
            if(!deleted) {
                res.status(404).json({error: "Nie udało się usunąć"});
            }
            res.status(204).json(deleted);
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(500).json({error: "Nie udało się usunąć zwierzaka: " + err.message});
            }
        }
    }
}
export default AnimalsController;
