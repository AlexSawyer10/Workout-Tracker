import {submittedWorkouts} from "./make_fitness_routines.mjs";
import {FitnessRoutine} from "./FitnessRoutine.mjs";



document.addEventListener('DOMContentLoaded', () => {

    const workoutContainer = document.getElementById('existing-workout')
    workoutContainer.innerHTML = '';

    let setsInputScoped;
    let repsInputScoped;
    let minutesInputScoped;
    let secondsInputScoped;

    const workoutDisplay = JSON.parse(localStorage.getItem('workouts')); // remember u set key in other file, have to parse it because it came in json format
    console.log(workoutDisplay); //make sure its printing

    workoutDisplay.forEach((workout, index) => {
        const overallContainer = document.createElement('div');
        overallContainer.className = "card"

        if (workout.repOrTimer === 'rep')
        {
            const individualWorkoutContainer = document.createElement("div");
            individualWorkoutContainer.className = "card-body" /*bootstrap - https://getbootstrap.com/docs/5.3/components/card/#about*/

            const displayName = document.createElement("h5")
            displayName.className = "card-title"
            displayName.innerHTML = workout.name;

            const displayRepOrTimer = document.createElement("h6")
            displayRepOrTimer.innerHTML = `Rep or Timer Based: ${workout.repOrTimer}`;

            const displaySets = document.createElement("h6");
            displaySets.innerHTML = `Number of sets: ${workout.sets}`;

            const displayReps = document.createElement("h6");
            displayReps.innerHTML = `Number of reps: ${workout.reps}`;

            individualWorkoutContainer.appendChild(displayName);
            individualWorkoutContainer.appendChild(displayRepOrTimer);
            individualWorkoutContainer.appendChild(displaySets);
            individualWorkoutContainer.appendChild(displayReps);

            overallContainer.appendChild(individualWorkoutContainer);

            const finishButton = document.createElement("button");
            finishButton.className = "btn btn-primary";
            finishButton.innerHTML = "Finished!";
            finishButton.addEventListener("click", () => {

                overallContainer.classList.remove('card');

                overallContainer.classList.add('bg-success'); // https://getbootstrap.com/docs/5.3/utilities/background/#how-it-works

            });

            const editButton = document.createElement("button")
            editButton.className = "btn btn-primary"
            editButton.innerHTML = "Edit Workout"

            editButton.addEventListener("click", () => {

                const editWorkoutDetails = document.createElement("div");
                editWorkoutDetails.className = "editWorkoutContainer"
                editWorkoutDetails.innerHTML = "Enter Workout Name";

                const editWorkoutInputContainer = document.createElement("div");
                editWorkoutDetails.appendChild(editWorkoutInputContainer);

                individualWorkoutContainer.appendChild(editWorkoutDetails);

                const editNameDetails = document.createElement("div");
                editNameDetails.className = "card"
                editNameDetails.innerHtml = "Enter In Your Name: "

                editWorkoutDetails.appendChild(editNameDetails);

                const editWorkoutNameInput = document.createElement('input');
                editWorkoutNameInput.type = 'text';
                editWorkoutNameInput.placeholder = "Enter workout name: ";

                editNameDetails.appendChild(editWorkoutNameInput);

                const editWorkoutNameFeedback = document.createElement("h6");

                editWorkoutNameInput.addEventListener("input", (e) => {
                    if (e.target.value === null || e.target.value === undefined || e.target.value === "")
                    {
                        editWorkoutNameInput?.setCustomValidity('Invalid');
                    } else
                    {
                        e.target.setCustomValidity('');
                    }
                    checkValidity(e.target, editWorkoutNameFeedback);
                });

                editWorkoutNameInput.appendChild(editWorkoutNameFeedback);

                const editRepOrTimerContainer = document.createElement("div"); // REP OR TIMER NAME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                editRepOrTimerContainer.className = 'editWorkoutContainer';
                editRepOrTimerContainer.innerHTML = "Is your workout rep based or timer based? ";

                const editRepOrTimerInput = document.createElement("input");
                editRepOrTimerInput.type = "text";
                editRepOrTimerInput.placeholder = "Input rep or timer.";

                const editRepOrTimerFeedback = document.createElement("h6");

                editWorkoutDetails.appendChild(editRepOrTimerContainer);
                editRepOrTimerContainer.appendChild(editRepOrTimerInput);
                editRepOrTimerContainer.appendChild(editRepOrTimerFeedback);

                editRepOrTimerInput.addEventListener("input", (e) => //remember type input is always actively checking
                {
                    const output = e.target.value.toLowerCase();

                    editWorkoutInputContainer.innerHTML = '';

                   /* while (individualWorkoutContainer.children.length > 2) // Remember at this point workoutDetail (which is the parent container) should only have 2 containers, under it. Rep and timer. So if theres anymore that would be over 3, then removed.// children just looks for sub elements of workoutDetail. (child) https://developer.mozilla.org/en-US/docs/Web/API/Element/children (last child) https://developer.mozilla.org/en-US/docs/Web/API/Element/children refer if confused
                    {
                        individualWorkoutContainer.lastChild.remove();
                    }*/ // this doesnt work like my other file, I have so many containers its kinda messy and I cant find which one to remove

                    if(output === "rep")
                    {

                        e.target.setCustomValidity(''); // this makes it valid

                        const editSetsContainer = document.createElement("div"); // TIME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                        editSetsContainer.className = 'editWorkoutContainer';
                        editSetsContainer.innerHTML = "Enter the number of sets: ";

                        let editSetsInput = document.createElement("input");
                        editSetsInput.type = "text";
                        editSetsInput.placeholder = "Input the number of sets: ";

                        const editSetsFeedback = document.createElement("h6");

                        editSetsInput.addEventListener("input", (e) => {
                            const parseInput = parseInt(e.target.value);

                            if (isNaN(parseInput))
                            {
                                editSetsInput.setCustomValidity('Invalid');
                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                setsInputScoped = parseInput;
                            }
                            checkValidity(e.target, editSetsFeedback);
                        });

                        editWorkoutDetails.appendChild(editSetsContainer);
                        editSetsContainer.appendChild(editSetsInput);
                        editSetsContainer.appendChild(editSetsFeedback);

                        const editRepFeedback = document.createElement("h6");

                        const editRepContainer = document.createElement("div");
                        editRepContainer.className = 'editWorkoutContainer';
                        editRepContainer.innerHTML = "Enter the number of reps:  ";

                        let editRepInput = document.createElement("input");
                        editRepInput.type = "text";
                        editRepInput.placeholder = "Input the number of reps ";


                        editRepInput.addEventListener("input", (e) => {
                            const parseInput = parseInt(e.target.value);

                            if (isNaN(parseInput))
                            {
                                editRepInput.setCustomValidity('Invalid');

                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                repsInputScoped = parseInput;
                            }
                            checkValidity(e.target, editRepFeedback);
                        });

                        editWorkoutDetails.appendChild(editRepContainer);
                        editRepContainer.appendChild(editRepInput);
                        editRepContainer.appendChild(editRepFeedback);


                        const submitButton = document.createElement("button")
                        submitButton.className = "btn btn-primary";
                        submitButton.innerHTML = "Submit";

                        editWorkoutDetails.appendChild(submitButton);

                        submitButton.addEventListener('click', () =>
                        {
                            let editRepBasedInputs = [];

                            editRepBasedInputs.push(setsInputScoped, repsInputScoped);

                            if (editRepOrTimerInput.value.toLowerCase() === "rep")
                            {
                                if (editWorkoutNameInput.value === null || editWorkoutNameInput.value === "" ||
                                    editWorkoutNameInput.value === undefined)
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, workout name can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    checkValidity(editWorkoutNameInput.value, invalidContainer);

                                    return;
                                }

                            }
                            for (let input of editRepBasedInputs)
                            {
                                if(input === null)
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);


                                    return;
                                }
                                if (isNaN(input))
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, must only have numeric values";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    return;
                                }
                                else
                                {
                                    const validContainer = document.createElement("div")
                                    validContainer.className = 'editWorkoutContainer';
                                    validContainer.innerHTML = "Valid inputs upon submission";
                                    document.createElement("h6")
                                    validContainer.style.color = 'green';

                                    const workout = new FitnessRoutine(editWorkoutNameInput.value,
                                        editRepOrTimerInput.value,setsInputScoped,
                                        repsInputScoped,minutesInputScoped,
                                        secondsInputScoped );

                                    submittedWorkouts[index] = workout // identify by the index so the object knows which one it is

                                    localStorage.setItem('workouts', JSON.stringify(submittedWorkouts)); // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage documentation,
                                    // remember because its an object u have to use JSON.stringify

                                    editWorkoutDetails.appendChild(validContainer);

                                    window.location.reload(); // have to refresh to review results

                                    return;
                                }
                            }
                        });
                    }

                    else if (output === "timer") //start of this condition allows all of the other inputs to be shown.
                    {
                        e.target.setCustomValidity(''); // this makes it valid
                        const editMinutesContainer = document.createElement("div"); // TIME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                        editMinutesContainer.className = 'editWorkoutContainer';
                        editMinutesContainer.innerHTML = "Enter the number of minutes:  ";

                        let editMinutesInput = document.createElement("input");
                        editMinutesInput.type = "text";
                        editMinutesInput.placeholder = "Input the number of minutes: ";

                        const editMinutesFeedback = document.createElement("h6");

                        editMinutesInput.addEventListener("input", (e) =>
                        {
                            const parseInput  = parseInt(e.target.value);

                            if(isNaN (parseInput))
                            {
                                editMinutesInput.setCustomValidity('Invalid');
                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                minutesInputScoped = parseInput;
                            }
                            checkValidity(e.target,editMinutesFeedback);
                        });

                        editWorkoutDetails.appendChild(editMinutesContainer);
                        editMinutesContainer.appendChild(editMinutesInput);
                        editMinutesContainer.appendChild(editMinutesFeedback);

                        const editSecondsFeedback = document.createElement("h6");

                        const editSecondsContainer = document.createElement("div");
                        editSecondsContainer.className = 'editWorkoutContainer';
                        editSecondsContainer.innerHTML = "Enter the number of seconds:  ";

                        let editSecondsInput = document.createElement("input");
                        editSecondsInput.type = "text";
                        editSecondsInput.placeholder = "Input the number of seconds: ";

                        editSecondsInput.addEventListener("input", (e) =>
                        {
                            const parseInput  = parseInt(e.target.value);

                            if(isNaN (parseInput))
                            {
                                editSecondsInput.setCustomValidity('Invalid');
                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                secondsInputScoped = parseInput;
                            }
                            checkValidity(e.target,editSecondsFeedback);
                        });

                        editWorkoutDetails.appendChild(editSecondsContainer);
                        editSecondsContainer.appendChild(editSecondsInput);
                        editSecondsContainer.appendChild(editSecondsFeedback);

                        checkValidity(e.target,editRepOrTimerFeedback);


                        const submitButton = document.createElement("button") // SUBMIT LOGIC STARTS HERE
                        submitButton.className = "btn btn-primary";
                        submitButton.innerHTML = "Submit";

                        editWorkoutDetails.appendChild(submitButton);

                        submitButton.addEventListener('click', () =>
                        {
                            let editTimerBasedInputs = [];

                            editTimerBasedInputs.push(minutesInputScoped, secondsInputScoped); // add it to the array

                            if (editRepOrTimerInput.value.toLowerCase() === "timer")
                            {
                                if (editWorkoutNameInput.value === null || editWorkoutNameInput.value === "" ||
                                    editWorkoutNameInput.value === undefined)
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, workout name can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    checkValidity(editWorkoutNameInput.value, invalidContainer);

                                    return;
                                }

                            }
                            for (let input of editTimerBasedInputs)
                            {
                                if(input === null)
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);


                                    return;
                                }
                                if (isNaN(input))
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, must only have numeric values";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    return;
                                }
                                else
                                {
                                    const validContainer = document.createElement("div")
                                    validContainer.className = 'editWorkoutContainer';
                                    validContainer.innerHTML = "Valid inputs upon submission";
                                    document.createElement("h6")
                                    validContainer.style.color = 'green';

                                    const workout = new FitnessRoutine(editWorkoutNameInput.value,
                                        editRepOrTimerInput.value,setsInputScoped,
                                        repsInputScoped,minutesInputScoped,
                                        secondsInputScoped );

                                    submittedWorkouts[index] = workout // identify by the index so the object knows which one it is

                                    localStorage.setItem('workouts', JSON.stringify(submittedWorkouts)); // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage documentation,
                                    // remember because its an object u have to use JSON.stringify

                                    editWorkoutDetails.appendChild(validContainer);

                                    window.location.reload(); // have to refresh to review results

                                    return;
                                }
                            }
                        });

                    }

                    else
                    {
                        e.target.setCustomValidity('Invalid');
                    }
                    checkValidity(e.target,editRepOrTimerFeedback);



                });
            });

                const deleteButton = document.createElement("button")
                deleteButton.className = "btn btn-danger"
                deleteButton.innerHTML = "Delete Workout"
                deleteButton.addEventListener("click", () => {

                    workoutDisplay.splice(index, 1) // the 1 specifies how many items to remove. https://www.w3schools.com/jsref/jsref_splice.asp read if confused
                    localStorage.setItem('workouts', JSON.stringify(workoutDisplay)) // re-set the localstorage because workoutDisplay was modified

                    overallContainer.remove(); // clear the container so u cant see it anymore cuz u deleted it

                });


                individualWorkoutContainer.appendChild(finishButton);
                individualWorkoutContainer.appendChild(editButton);
                individualWorkoutContainer.appendChild(deleteButton);

                workoutContainer.appendChild(overallContainer);

                overallContainer.appendChild(individualWorkoutContainer);


        }
        if (workout.repOrTimer === 'timer') // hold
        {
            const individualWorkoutContainer = document.createElement("div");
            individualWorkoutContainer.className = "card-body" /*bootstrap - https://getbootstrap.com/docs/5.3/components/card/#about*/

            const displayName = document.createElement("h5")
            displayName.className = "card-title"
            displayName.innerHTML = workout.name;

            const displayRepOrTimer = document.createElement("h6")
            displayRepOrTimer.innerHTML = `Rep or Timer Based: ${workout.repOrTimer}`;

            const displayMinutes = document.createElement("h6");
            displayMinutes.innerHTML = `Number of minutes: ${workout.minutes}`;

            const displaySeconds = document.createElement("h6");
            displaySeconds.innerHTML = `Number of seconds: ${workout.seconds}`;

            individualWorkoutContainer.appendChild(displayName);
            individualWorkoutContainer.appendChild(displayRepOrTimer);
            individualWorkoutContainer.appendChild(displayMinutes);
            individualWorkoutContainer.appendChild(displaySeconds);

            overallContainer.appendChild(individualWorkoutContainer);

            const startButton = document.createElement("button");
            startButton.className = "btn btn-primary";
            startButton.innerHTML = "Start!";

            startButton.addEventListener("click", () => {


                const startTimerContainer = document.createElement("div");

                let startTimerOutput = document.createElement("h6");

                let timerFeedback = document.createElement("h6");

                timerFeedback.id = index;

                startTimerOutput.id = index;

                individualWorkoutContainer.id = "container" + index;

                individualWorkoutContainer.appendChild(startTimerContainer);
                overallContainer.appendChild(startTimerContainer);

                startTimerContainer.appendChild(startTimerOutput);

                let timerOutput = startTimer(workout,index);

            });

            individualWorkoutContainer.appendChild(startButton);

            const editButton = document.createElement("button");
            editButton.className = "btn btn-primary"
            editButton.innerHTML = "Edit Workout"

            individualWorkoutContainer.appendChild(editButton);

            editButton.addEventListener("click", () => {

                const editWorkoutDetails = document.createElement("div");
                editWorkoutDetails.className = "editWorkoutContainer"
                editWorkoutDetails.innerHTML = "Enter Workout Name";

                const editWorkoutInputContainer = document.createElement("div");
                editWorkoutDetails.appendChild(editWorkoutInputContainer);

                individualWorkoutContainer.appendChild(editWorkoutDetails);

                const editNameDetails = document.createElement("div");
                editNameDetails.className = "card"
                editNameDetails.innerHtml = "Enter In Your Name: "

                editWorkoutDetails.appendChild(editNameDetails);

                const editWorkoutNameInput = document.createElement('input');
                editWorkoutNameInput.type = 'text';
                editWorkoutNameInput.placeholder = "Enter workout name: ";

                editNameDetails.appendChild(editWorkoutNameInput);

                const editWorkoutNameFeedback = document.createElement("h6");

                editWorkoutNameInput.addEventListener("input", (e) => {
                    if (e.target.value === null || e.target.value === undefined || e.target.value === "")
                    {
                        editWorkoutNameInput?.setCustomValidity('Invalid');
                    }
                    else
                    {
                        e.target.setCustomValidity('');
                    }
                    checkValidity(e.target, editWorkoutNameFeedback);
                });

                editWorkoutNameInput.appendChild(editWorkoutNameFeedback);

                const editRepOrTimerContainer = document.createElement("div"); // REP OR TIMER NAME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                editRepOrTimerContainer.className = 'editWorkoutContainer';
                editRepOrTimerContainer.innerHTML = "Is your workout rep based or timer based? ";

                const editRepOrTimerInput = document.createElement("input");
                editRepOrTimerInput.type = "text";
                editRepOrTimerInput.placeholder = "Input rep or timer.";

                const editRepOrTimerFeedback = document.createElement("h6");

                editWorkoutDetails.appendChild(editRepOrTimerContainer);
                editRepOrTimerContainer.appendChild(editRepOrTimerInput);
                editRepOrTimerContainer.appendChild(editRepOrTimerFeedback);

                editRepOrTimerInput.addEventListener("input", (e) => //remember type input is always actively checking
                {
                    const output = e.target.value.toLowerCase();

                    editWorkoutInputContainer.innerHTML = '';

                    /* while (individualWorkoutContainer.children.length > 2) // Remember at this point workoutDetail (which is the parent container) should only have 2 containers, under it. Rep and timer. So if theres anymore that would be over 3, then removed.// children just looks for sub elements of workoutDetail. (child) https://developer.mozilla.org/en-US/docs/Web/API/Element/children (last child) https://developer.mozilla.org/en-US/docs/Web/API/Element/children refer if confused
                     {
                         individualWorkoutContainer.lastChild.remove();
                     }*/ // this doesnt work like my other file, I have so many containers its kinda messy and I cant find which one to remove

                    if (output === "rep")
                    {

                        e.target.setCustomValidity(''); // this makes it valid

                        const editSetsContainer = document.createElement("div"); // TIME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                        editSetsContainer.className = 'editWorkoutContainer';
                        editSetsContainer.innerHTML = "Enter the number of sets: ";

                        let editSetsInput = document.createElement("input");
                        editSetsInput.type = "text";
                        editSetsInput.placeholder = "Input the number of sets: ";

                        const editSetsFeedback = document.createElement("h6");

                        editSetsInput.addEventListener("input", (e) => {
                            const parseInput = parseInt(e.target.value);

                            if (isNaN(parseInput))
                            {
                                editSetsInput.setCustomValidity('Invalid');

                            } else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                setsInputScoped = parseInput;
                            }
                            checkValidity(e.target, editSetsFeedback);
                        });

                        editWorkoutDetails.appendChild(editSetsContainer);
                        editSetsContainer.appendChild(editSetsInput);
                        editSetsContainer.appendChild(editSetsFeedback);

                        const editRepFeedback = document.createElement("h6");

                        const editRepContainer = document.createElement("div");
                        editRepContainer.className = 'editWorkoutContainer';
                        editRepContainer.innerHTML = "Enter the number of reps:  ";

                        let editRepInput = document.createElement("input");
                        editRepInput.type = "text";
                        editRepInput.placeholder = "Input the number of reps ";


                        editRepInput.addEventListener("input", (e) => {
                            const parseInput = parseInt(e.target.value);

                            if (isNaN(parseInput))
                            {
                                editRepInput.setCustomValidity('Invalid');

                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                repsInputScoped = parseInput;
                            }
                            checkValidity(e.target, editRepFeedback);
                        });

                        editWorkoutDetails.appendChild(editRepContainer);
                        editRepContainer.appendChild(editRepInput);
                        editRepContainer.appendChild(editRepFeedback);

                        const submitButton = document.createElement("button")
                        submitButton.className = "btn btn-primary";
                        submitButton.innerHTML = "Submit";

                        editWorkoutDetails.appendChild(submitButton);

                        submitButton.addEventListener('click', () => {
                            let editRepBasedInputs = [];

                            editRepBasedInputs.push(setsInputScoped, repsInputScoped);

                            if (editRepOrTimerInput.value.toLowerCase() === "rep") {
                                if (editWorkoutNameInput.value === null || editWorkoutNameInput.value === "" ||
                                    editWorkoutNameInput.value === undefined) {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, workout name can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    checkValidity(editWorkoutNameInput.value, invalidContainer);

                                    return;
                                }

                            }
                            for (let input of editRepBasedInputs) {
                                if (input === null) {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);


                                    return;
                                }
                                if (isNaN(input))
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, must only have numeric values";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    return;
                                }
                                else
                                {
                                    const validContainer = document.createElement("div")
                                    validContainer.className = 'editWorkoutContainer';
                                    validContainer.innerHTML = "Valid inputs upon submission";
                                    document.createElement("h6")
                                    validContainer.style.color = 'green';

                                    const workout = new FitnessRoutine(editWorkoutNameInput.value,
                                        editRepOrTimerInput.value, setsInputScoped,
                                        repsInputScoped, minutesInputScoped,
                                        secondsInputScoped);

                                    submittedWorkouts[index] = workout // identify by the index so the object knows which one it is

                                    localStorage.setItem('workouts', JSON.stringify(submittedWorkouts)); // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage documentation,
                                    // remember because its an object u have to use JSON.stringify

                                    editWorkoutDetails.appendChild(validContainer);

                                    window.location.reload(); // idk why but it holds on to previous input data unless I refresh so I added this. https://developer.mozilla.org/en-US/docs/Web/API/Location/reload


                                    return;
                                }
                            }
                        });
                    }
                    else if (output === "timer") //start of this condition allows all of the other inputs to be shown.
                    {
                        e.target.setCustomValidity(''); // this makes it valid
                        const editMinutesContainer = document.createElement("div"); // TIME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                        editMinutesContainer.className = 'editWorkoutContainer';
                        editMinutesContainer.innerHTML = "Enter the number of minutes:  ";

                        let editMinutesInput = document.createElement("input");
                        editMinutesInput.type = "text";
                        editMinutesInput.placeholder = "Input the number of minutes: ";

                        const editMinutesFeedback = document.createElement("h6");

                        editMinutesInput.addEventListener("input", (e) => {
                            const parseInput = parseInt(e.target.value);

                            if (isNaN(parseInput))
                            {
                                editMinutesInput.setCustomValidity('Invalid');
                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                minutesInputScoped = parseInput;
                            }
                            checkValidity(e.target, editMinutesFeedback);
                        });

                        editWorkoutDetails.appendChild(editMinutesContainer);
                        editMinutesContainer.appendChild(editMinutesInput);
                        editMinutesContainer.appendChild(editMinutesFeedback);

                        const editSecondsFeedback = document.createElement("h6");

                        const editSecondsContainer = document.createElement("div");
                        editSecondsContainer.className = 'editWorkoutContainer';
                        editSecondsContainer.innerHTML = "Enter the number of seconds:  ";

                        let editSecondsInput = document.createElement("input");
                        editSecondsInput.type = "text";
                        editSecondsInput.placeholder = "Input the number of seconds: ";

                        editSecondsInput.addEventListener("input", (e) => {
                            const parseInput = parseInt(e.target.value);

                            if (isNaN(parseInput))
                            {
                                editSecondsInput.setCustomValidity('Invalid');
                            }
                            else
                            {
                                e.target.setCustomValidity(''); // remember this sets it to valid
                                secondsInputScoped = parseInput;
                            }
                            checkValidity(e.target, editSecondsFeedback);
                        });

                        editWorkoutDetails.appendChild(editSecondsContainer);
                        editSecondsContainer.appendChild(editSecondsInput);
                        editSecondsContainer.appendChild(editSecondsFeedback);

                        checkValidity(e.target, editRepOrTimerFeedback);


                        const submitButton = document.createElement("button") // SUBMIT LOGIC STARTS HERE
                        submitButton.className = "btn btn-primary";
                        submitButton.innerHTML = "Submit";

                        editWorkoutDetails.appendChild(submitButton);

                        submitButton.addEventListener('click', () => {
                            let editTimerBasedInputs = [];

                            editTimerBasedInputs.push(minutesInputScoped, secondsInputScoped); // add it to the array

                            if (editRepOrTimerInput.value.toLowerCase() === "timer")
                            {
                                if (editWorkoutNameInput.value === null || editWorkoutNameInput.value === "" ||
                                    editWorkoutNameInput.value === undefined)
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, workout name can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    checkValidity(editWorkoutNameInput.value, invalidContainer);

                                    return;
                                }

                            }
                            for (let input of editTimerBasedInputs)
                            {
                                if (input === null)
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, can't be null";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);


                                    return;
                                }
                                if (isNaN(input))
                                {
                                    const invalidContainer = document.createElement("div")
                                    invalidContainer.className = 'editWorkoutContainer';
                                    invalidContainer.innerHTML = "Invalid inputs upon submission, must only have numeric values";
                                    document.createElement("h6")
                                    invalidContainer.style.color = 'red';

                                    editWorkoutDetails.appendChild(invalidContainer);

                                    return;
                                }
                                else
                                {
                                    const validContainer = document.createElement("div")
                                    validContainer.className = 'editWorkoutContainer';
                                    validContainer.innerHTML = "Valid inputs upon submission";
                                    document.createElement("h6")
                                    validContainer.style.color = 'green';

                                    const workout = new FitnessRoutine(editWorkoutNameInput.value,
                                        editRepOrTimerInput.value, setsInputScoped,
                                        repsInputScoped, minutesInputScoped,
                                        secondsInputScoped);

                                    submittedWorkouts[index] = workout // identify by the index so the object knows which one it is

                                    localStorage.setItem('workouts', JSON.stringify(submittedWorkouts)); // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage documentation,
                                    // remember because its an object u have to use JSON.stringify

                                    editWorkoutDetails.appendChild(validContainer);

                                    window.location.reload(); // idk why but it holds on to previous input data unless I refresh so I added this. https://developer.mozilla.org/en-US/docs/Web/API/Location/reload

                                    return;
                                }
                            }
                        });

                    }

                    else
                    {
                        e.target.setCustomValidity('Invalid');
                    }
                    checkValidity(e.target, editRepOrTimerFeedback);

                });
            });

            const deleteButton = document.createElement("button")
            deleteButton.className = "btn btn-danger"
            deleteButton.innerHTML = "Delete Workout"
            deleteButton.addEventListener("click", () => {

                workoutDisplay.splice(index, 1) // the 1 specifies how many items to remove. https://www.w3schools.com/jsref/jsref_splice.asp read if confused
                localStorage.setItem('workouts', JSON.stringify(workoutDisplay)) // re-set the localstorage because workoutDisplay was modified

                overallContainer.remove(); // clear the container so u cant see it anymore cuz u deleted it

            });
            individualWorkoutContainer.appendChild(deleteButton);

            workoutContainer.appendChild(overallContainer);

        }

    });

});

function checkValidity(element, feedbackElement)
{
    if (element.validity.valid) {
        feedbackElement.textContent = 'Looks good!';
        feedbackElement.style.color = 'green';
        feedbackElement.classList.add('valid');
        feedbackElement.classList.remove('invalid');
    } else // input is invalid
    {
        feedbackElement.textContent = element.validationMessage;
        feedbackElement.classList.add('invalid');
        feedbackElement.style.color = 'red';
        feedbackElement.classList.remove('valid');
    }
}

function startTimer(workout,index)
{
    let seconds = ((workout.minutes * 60) + workout.seconds);

    let output = document.getElementById(index)

    let container = document.getElementById("container" + index);

    const timer =  setInterval(() =>
    {
       seconds--;

        output.innerHTML = seconds

        if(seconds < 1) // check if it stops
        {
            clearInterval(timer);
            container.classList.add('bg-success'); // https://getbootstrap.com/docs/5.3/utilities/background/#how-it-works
        }
    } , 1000);

}
