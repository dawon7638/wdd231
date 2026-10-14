
const target = document.querySelector('#form-results');

if (target) {
    const params = new URLSearchParams(location.search);

    const labels = {
        name: 'Name',
        email: 'Email',
        experience: 'Experience',
        style: 'Playing style',
        budget: 'Budget',
        goal: 'Setup goal'
    };

    const dl = document.createElement('dl');

    let count = 0;

    // Loop through the form fields
    for (const [key, label] of Object.entries(labels)) {
        const value = params.get(key);

        if (!value) {
            continue;
        }

        // Create the field label
        const dt = document.createElement('dt');
        dt.textContent = label;
        dt.style.fontWeight = '700';

        // Create the field value
        const dd = document.createElement('dd');
        dd.textContent = value;

        // Add the label and value to the list
        dl.append(dt, dd);

        count++;
    }

    // Display the submitted form information
    target.replaceChildren(
        count
            ? dl
            : document.createTextNode(
                'No form data was submitted. Return to the planner to complete the form.'
            )
    );
}
