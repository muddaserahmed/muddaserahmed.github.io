// const urlParams = new URLSearchParams(window.location.search);
// const section_param = urlParams.get('section'); // 'John'
// Above params are globally declared in script.js







function displayTextSections(groupedData, sectionName) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = ``;

  groupedData.forEach((book) => {
    bookGrid.innerHTML += '<div class="col-md-6">' +
    '<div class="card flex-md-row mb-4 box-shadow h-md-250">' +
        '<div class="card-body d-flex flex-column align-items-start">' +
          '<strong class="d-inline-block mb-2 text-primary">' + book.Section + '</strong>' +
          '<h3 class="mb-0">' +
            '<a class="text-dark" href="' + book.Link + '">' + book.Title + '</a>' +
          '</h3>' +
          '<p class="card-text mb-auto">' + book.Description + '</p>' +
        '</div>' +
        '<img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="' + book.Title + '" style="width: 200px; height: 250px;" src="' + book.Cover + '" data-holder-rendered="true">' +
      '</div>' +
    '</div>'
  });


}