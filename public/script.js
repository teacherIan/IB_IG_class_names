console.log('Working');
const ibFile = document.getElementById('ibFile');
const ibSubmit = document.getElementById('ibSubmit');
const igFile = document.getElementById('igFile');
const igSubmit = document.getElementById('igSubmit');

ibFile.addEventListener('click', () => {
  ibSubmit.disabled = false;
});

igFile.addEventListener('click', () => {
  igSubmit.disabled = false;
});
