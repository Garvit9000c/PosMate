let subm = document.getElementById('submit');

subm.addEventListener('click', () => {
        setTimeout(() => {

        subm.style.display = 'none';
        subm.innerHTML =
            '<div class="d-flex align-items-center">' +
            '<strong> Loading... </strong>' +
            '<div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>' +
            '</div>'

        },3000);
    })
