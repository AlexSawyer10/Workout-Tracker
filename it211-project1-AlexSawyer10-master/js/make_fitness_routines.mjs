import {FitnessRoutine} from "./FitnessRoutine.mjs";

export let submittedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];

// Local storage- what is it? Local storage allows you to store data in the browser even after you close tabs or change tabs and are using more than one MJS file, or restart the computer.
// This allows me to break up the code alot and work in many HTML/JS pages, it helped me a lot with not having spaghetti code (although I still had some lol).

document.addEventListener('DOMContentLoaded', () =>
{

    document.getElementById('add-workout')?.addEventListener('click', () => // this is my add-workout button //null check gets rid of weird error
    {
        let setsInputScoped;
        let repsInputScoped;
        let minutesInputScoped;
        let secondsInputScoped;

        const workoutDetail = document.getElementById('workout-details');
        workoutDetail.innerHTML = ''; // Remember this clears everything. All of html contents within this element will be cleared.

        const workoutNameContainer = document.createElement("div"); // WORKOUT NAME LOGIC STARTS HERE, remember get that
        workoutNameContainer.className = 'newWorkoutContainer';
        workoutNameContainer.innerHTML = "Enter workout name: ";


        const workoutNameInput = document.createElement('input');
        workoutNameInput.type = 'text';
        workoutNameInput.placeholder = "Enter workout name";

        workoutDetail.appendChild(workoutNameContainer);
        workoutNameContainer.appendChild(workoutNameInput);

        const workoutNameFeedback = document.createElement("h6");


        workoutNameInput.addEventListener("input", (e) =>
        {
            if(e.target.value === null || e.target.value === undefined || e.target.value === "")
            {
                workoutNameInput?.setCustomValidity('Invalid');
            }
            else
            {
                e.target.setCustomValidity('');
            }
            checkValidity(e.target,workoutNameFeedback);
        });

        workoutNameContainer.appendChild(workoutNameFeedback);


        const repOrTimerContainer = document.createElement("div"); // REP OR TIMER NAME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
        repOrTimerContainer.className = 'newWorkoutContainer';
        repOrTimerContainer.innerHTML = "Is your workout rep based or timer based? ";

        const repOrTimerInput = document.createElement("input");
        repOrTimerInput.type = "text";
        repOrTimerInput.placeholder = "Input rep or timer.";

        const repOrTimerFeedback = document.createElement("h6");

        workoutDetail.appendChild(repOrTimerContainer);
        repOrTimerContainer.appendChild(repOrTimerInput);
        repOrTimerContainer.appendChild(repOrTimerFeedback);



        repOrTimerInput.addEventListener("input", (e) => //remember type input is always actively checking
        {
            const output = e.target.value.toLowerCase();

            while(workoutDetail.children.length > 2) // Remember at this point workoutDetail (which is the parent container) should only have 2 containers, under it. Rep and timer. So if theres anymore that would be over 3, then removed.
            // children just looks for sub elements of workoutDetail. (child) https://developer.mozilla.org/en-US/docs/Web/API/Element/children (last child) https://developer.mozilla.org/en-US/docs/Web/API/Element/children refer if confused
            {
                workoutDetail.lastChild.remove();
            }

            if(output === "rep")
            {
                    e.target.setCustomValidity(''); // this makes it valid
                    const setsContainer = document.createElement("div"); // TIME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                    setsContainer.className = 'newWorkoutContainer';
                    setsContainer.innerHTML = "Enter the number of sets: ";

                    let setsInput = document.createElement("input");
                    setsInput.type = "text";
                    setsInput.placeholder = "Input the number of sets: ";

                    const setsFeedback = document.createElement("h6");

                    setsInput.addEventListener("input", (e) =>
                    {
                        const parseInput  = parseInt(e.target.value);

                        if(isNaN (parseInput))
                        {
                            setsInput.setCustomValidity('Invalid');

                        }
                        else
                        {
                            e.target.setCustomValidity(''); // remember this sets it to valid
                            setsInputScoped = parseInput;
                        }
                        checkValidity(e.target,setsFeedback);
                    });

                    workoutDetail.appendChild(setsContainer);
                    setsContainer.appendChild(setsInput);
                    setsContainer.appendChild(setsFeedback);

                    const repsFeedback = document.createElement("h6");

                    const repContainer = document.createElement("div");
                    repContainer.className = 'newWorkoutContainer';
                    repContainer.innerHTML = "Enter the number of reps:  ";

                    let repInput = document.createElement("input");
                    repInput.type = "text";
                    repInput.placeholder = "Input the number of reps ";



                repInput.addEventListener("input", (e) =>
                {
                    const parseInput  = parseInt(e.target.value);

                    if(isNaN (parseInput))
                    {
                        repInput.setCustomValidity('Invalid');

                    }
                    else
                    {
                        e.target.setCustomValidity(''); // remember this sets it to valid
                        repsInputScoped = parseInput;
                    }
                    checkValidity(e.target,repsFeedback);
                });

                    workoutDetail.appendChild(repContainer);
                    repContainer.appendChild(repInput);
                    repContainer.appendChild(repsFeedback);

            }

            else if (output === "timer") //start of this condition allows all of the other inputs to be shown.
            {

                e.target.setCustomValidity(''); // this makes it valid
                const minutesContainer = document.createElement("div"); // TIME LOGIC STARTS HERE, BAD VARIABLE NAMINGS SO FIX LATER
                minutesContainer.className = 'newWorkoutContainer';
                minutesContainer.innerHTML = "Enter the number of minutes:  ";

                let minutesInput = document.createElement("input");
                minutesInput.type = "text";
                minutesInput.placeholder = "Input the number of minutes: ";

                const minutesFeedback = document.createElement("h6");

                minutesInput.addEventListener("input", (e) =>
                {
                    const parseInput  = parseInt(e.target.value);

                    if(isNaN (parseInput))
                    {
                        minutesInput.setCustomValidity('Invalid');
                    }
                    else
                    {
                        e.target.setCustomValidity(''); // remember this sets it to valid
                        minutesInputScoped = parseInput;
                    }
                    checkValidity(e.target,minutesFeedback);
                });

                workoutDetail.appendChild(minutesContainer);
                minutesContainer.appendChild(minutesInput);
                minutesContainer.appendChild(minutesFeedback);

                const secondsFeedback = document.createElement("h6");

                const secondsContainer = document.createElement("div");
                secondsContainer.className = 'newWorkoutContainer';
                secondsContainer.innerHTML = "Enter the number of seconds:  ";

                let secondsInput = document.createElement("input");
                secondsInput.type = "text";
                secondsInput.placeholder = "Input the number of seconds: ";

                secondsInput.addEventListener("input", (e) =>
                {
                    const parseInput  = parseInt(e.target.value);

                    if(isNaN (parseInput))
                    {
                        secondsInput.setCustomValidity('Invalid');
                    }
                    else
                    {
                        e.target.setCustomValidity(''); // remember this sets it to valid
                        secondsInputScoped = parseInput;
                    }
                    checkValidity(e.target,secondsFeedback);
                });

                workoutDetail.appendChild(secondsContainer);
                secondsContainer.appendChild(secondsInput);
                secondsContainer.appendChild(secondsFeedback);

                checkValidity(e.target,repOrTimerFeedback);
            }

            else
            {
                e.target.setCustomValidity('Invalid');
            }
            checkValidity(e.target,repOrTimerFeedback);
        });

        document.getElementById('submit').addEventListener('click', () =>
        {
            if (repOrTimerInput.value.toLowerCase() === "rep")
            {
                let repBasedInputs = [];

                repBasedInputs.push(setsInputScoped,repsInputScoped);

                if(workoutNameInput.value === null || workoutNameInput.value === "" || workoutNameInput.value === undefined)
                {
                    const invalidContainer = document.createElement("div")
                    invalidContainer.className = 'newWorkoutContainer';
                    invalidContainer.innerHTML = "Invalid inputs upon submission, workout name can't be null";
                    document.createElement("h6")
                    invalidContainer.style.color = 'red';

                    workoutDetail.appendChild(invalidContainer);

                    checkValidity(workoutNameInput.value,invalidContainer);

                    return;
                }
                for (let input of repBasedInputs)
                {

                    if(input === null)
                    {
                        const invalidContainer = document.createElement("div")
                        invalidContainer.className = 'newWorkoutContainer';
                        invalidContainer.innerHTML = "Invalid inputs upon submission, can't be null";
                        document.createElement("h6")
                        invalidContainer.style.color = 'red';

                        workoutDetail.appendChild(invalidContainer);


                        return;
                    }
                    if (isNaN(input))
                    {
                        const invalidContainer = document.createElement("div")
                        invalidContainer.className = 'newWorkoutContainer';
                        invalidContainer.innerHTML = "Invalid inputs upon submission, must only have numeric values";
                        document.createElement("h6")
                        invalidContainer.style.color = 'red';

                        workoutDetail.appendChild(invalidContainer);

                        return;
                    }
                    else
                    {
                        const validContainer = document.createElement("div")
                        validContainer.className = 'newWorkoutContainer';
                        validContainer.innerHTML = "Valid inputs upon submission";
                        document.createElement("h6")
                        validContainer.style.color = 'green';

                        const workout = new FitnessRoutine(workoutNameInput.value,
                            repOrTimerInput.value,setsInputScoped,
                            repsInputScoped,minutesInputScoped,
                            secondsInputScoped );


                        submittedWorkouts.push(workout); // this adds the objects to the list so i can transfer all of them over to the next page

                        localStorage.setItem('workouts', JSON.stringify(submittedWorkouts)); // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage documentation,
                        // remember because its an object u have to use JSON.stringify

                        workoutDetail.appendChild(validContainer);

                        window.location.reload(); // idk why but it holds on to previous input data unless I refresh so I added this. https://developer.mozilla.org/en-US/docs/Web/API/Location/reload

                        return;
                    }
            }
          }

            if(repOrTimerInput.value.toLowerCase() === "timer")
            {
                let timerBasedInputs = [];
                timerBasedInputs.push(minutesInputScoped,secondsInputScoped);

                if(workoutNameInput.value === '')
                {
                    const invalidContainer = document.createElement("div")
                    invalidContainer.className = 'newWorkoutContainer';
                    invalidContainer.innerHTML = "Invalid inputs upon submission, workout name can't be null";
                    document.createElement("h6")
                    invalidContainer.style.color = 'red';

                    workoutDetail.appendChild(invalidContainer);
                    return;
                }

                for (let input of timerBasedInputs)
                {

                    if (isNaN(input))
                    {
                        const invalidContainer = document.createElement("div")
                        invalidContainer.className = 'newWorkoutContainer';
                        invalidContainer.innerHTML = "Invalid inputs upon submission, must only have numeric values";
                        document.createElement("h6")
                        invalidContainer.style.color = 'red';

                        workoutDetail.appendChild(invalidContainer);

                        return;
                    }
                    else
                    {
                        const validContainer = document.createElement("div")
                        validContainer.className = 'newWorkoutContainer';
                        validContainer.innerHTML = "Valid inputs upon submission";
                        document.createElement("h6")
                        validContainer.style.color = 'green';


                        workoutDetail.appendChild(validContainer);

                        const workout = new FitnessRoutine(workoutNameInput.value,
                            repOrTimerInput.value,setsInputScoped,
                            repsInputScoped,minutesInputScoped,
                            secondsInputScoped );

                        submittedWorkouts.push(workout); // this adds the objects to the list so i can transfer all of them over to the next page

                        localStorage.setItem('workouts', JSON.stringify(submittedWorkouts)); // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage documentation,
                        // remember because its an object u have to use JSON.stringify

                        window.location.reload(); // idk why but it holds on to previous input data unless I refresh so I added this. https://developer.mozilla.org/en-US/docs/Web/API/Location/reload

                        return;

                    }
                }

            }

        });
    });
});

function checkValidity(element, feedbackElement)
{
    if(element.validity.valid)
    {
        feedbackElement.textContent = 'Looks good!';
        feedbackElement.style.color = 'green';
        feedbackElement.classList.add('valid');
        feedbackElement.classList.remove('invalid');
    }

    else // input is invalid
    {
        feedbackElement.textContent = element.validationMessage;
        feedbackElement.classList.add('invalid');
        feedbackElement.style.color = 'red';
        feedbackElement.classList.remove('valid');
    }
 // commit with ReadMe
}
