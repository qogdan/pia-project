import { Pregled } from "./pregled";

export class Zakazan{
    _id:string;
    pregled:Pregled;
    patient: string;
    doctor:string;
    date: string;
    timeStart: string;
    timeEnd: string;
}