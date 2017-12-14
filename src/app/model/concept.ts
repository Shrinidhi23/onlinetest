import {Questions} from './question';
export class Concept{
    conceptID:string;
    questions:Questions[];
    constructor(){
        this.conceptID = "";
        this.questions =[];
    }
}