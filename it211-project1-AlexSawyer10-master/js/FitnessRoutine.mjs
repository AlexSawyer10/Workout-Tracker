export class FitnessRoutine
{

     name;
     repOrTimer;
     reps;
     minutes;
     seconds;

    constructor(name, repOrTimer, sets, reps, minutes, seconds)
    {
        this.name = name;
        this.repOrTimer = repOrTimer;
        this.sets = sets;
        this.reps = reps;
        this.minutes = minutes;
        this.seconds = seconds;
    }

};