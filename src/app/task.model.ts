import { Timestamp } from "rxjs"

export interface Task {
    id: number,
    title: string,
    dateCreation?: Date,
    description?: string,
    completed?: boolean
    priority?: number,
    dueDate? : Date,
    duration? : number,
}

// on utilise une interface et non une classe ici car on n'a besion 
//uniquement que les tâches respectent cette structure
//mais les taches n'ont pas besoin de logique de comportement
//dans une interface on peut déclarer des fonctions mais pas les impémenter