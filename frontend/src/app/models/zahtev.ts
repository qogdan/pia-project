import { Pregled } from "./pregled";
import { User } from "./user";

export class Zahtev{
    _id:string;
    reqType:string;
    status:string;
    user:User;
    pregled:Pregled;
}