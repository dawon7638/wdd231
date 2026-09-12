// ==========================================
// COURSE DATA
// ==========================================

// Use the course array provided by the assignment.
// The array should contain objects with:
// subject, number, title, credits, and completed.


// ==========================================
// HTML ELEMENTS
// ==========================================

const courseList = document.querySelector("#course-list");

const totalCredits = document.querySelector("#total-credits");

const allCoursesButton = document.querySelector("#all-courses");

const wddCoursesButton = document.querySelector("#wdd-courses");

const cseCoursesButton = document.querySelector("#cse-courses");


// ==========================================
// DISPLAY COURSES
// ==========================================

function displayCourses(courseArray) {

    // Clear the existing courses
    courseList.innerHTML = "";

    // Create a course card for every course
    courseArray.forEach(course => {

        // Create a div for the course
        const courseCard = document.createElement("div");

        // Add the course class
        courseCard.classList.add("course");

        // If the course is completed,
        // add the completed class
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        // Create the course content
        courseCard.innerHTML = `
            <span class="course-code">
                ${course.subject} ${course.number}
            </span>
            <br>
            ${course.title}
            <br>
            ${course.credits} credits
        `;

        // Add the course card to the page
        courseList.appendChild(courseCard);
    });

    // Calculate the credits for the courses currently displayed
    calculateCredits(courseArray);
}


// ==========================================
// CALCULATE CREDITS
// ==========================================

function calculateCredits(courseArray) {

    // Add all of the credits together
    const credits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    // Display the total
    totalCredits.textContent = credits;
}


// ==========================================
// ALL COURSES BUTTON
// ==========================================

allCoursesButton.addEventListener("click", () => {

    // Display every course
    displayCourses(courses);

});


// ==========================================
// WDD COURSES BUTTON
// ==========================================

wddCoursesButton.addEventListener("click", () => {

    // Filter the courses to only WDD courses
    const wddCourses = courses.filter(course =>
        course.subject === "WDD"
    );

    // Display the filtered courses
    displayCourses(wddCourses);

});


// ==========================================
// CSE COURSES BUTTON
// ==========================================

cseCoursesButton.addEventListener("click", () => {

    // Filter the courses to only CSE courses
    const cseCourses = courses.filter(course =>
        course.subject === "CSE"
    );

    // Display the filtered courses
    displayCourses(cseCourses);

});


// ==========================================
// INITIAL DISPLAY
// ==========================================

// Display all courses when the page loads
displayCourses(courses);