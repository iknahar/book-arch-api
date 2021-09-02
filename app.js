const bookContainer = document.getElementById("book-container");

let bookDetails = document.getElementById("book-details");
document.getElementById("search-btn").addEventListener("click", () => {
  bookContainer.innerHTML = `<div class = "d-flex justify-content-center align-items-center">
      <div class = "spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
  const searchText = document.getElementById("search-text");
  const api = `http://openlibrary.org/search.json?q=${searchText.value}`;
  searchText.value = "";
  fetch(api)
    .then((res) => res.json())
    .then((data) => showData(data.docs));
});

const showData = (books) => {
  var newArr = books.filter(
    (one) =>
      one.cover_i !== undefined &&
      one.author_name !== undefined &&
      one.publisher !== undefined &&
      one.title !== undefined &&
      one.first_publish_year !== undefined
  );
  {
    if (newArr.length === 0) {
      bookDetails.innerHTML = "";
      bookContainer.innerHTML = "No Result Found";
    } else {
      var newP = document.createElement("p");
      newP.innerHTML = `${newArr.length} books found`;
      bookDetails.innerHTML = "";
      bookDetails.appendChild(newP);
      bookContainer.innerHTML = "";

      newArr.forEach((book) => {
        const newDiv = document.createElement("div");
        // newDiv.classList.add("col-4 card my-3");
        newDiv.innerHTML = `
        <div class="col-4 card my-3" style="width: 18rem; height: auto">
        <img class="card-img-top img-fluid" style="width: auto; height: 250px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">

        <div class="card-body" >
          <h5 class="card-title text-primary">${book.title}</h5>
          <p class="card-subtitle text-success mb-2" >${book.author_name[0]}</p>
          <p class="card-subtitle text-success mb-2" >${book.publisher[0]}</p>
          <p class="card-subtitle text-success mb-2" >${book.first_publish_year}</p>
        </div>
    </div>`;

        bookContainer.appendChild(newDiv);
      });
    }
  }
};
