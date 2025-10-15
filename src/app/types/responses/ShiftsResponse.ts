export type Shifts = {
    day:string;
    shifts:Shift[]
}

type Shift = {
    id:string;
    hour:string;
    status: string;
}