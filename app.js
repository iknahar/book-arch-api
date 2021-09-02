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
  let allResult = books.filter(
    (book) =>
      book.cover_i !== undefined &&
      book.author_name !== undefined &&
      book.publisher !== undefined &&
      book.title !== undefined &&
      book.first_publish_year !== undefined
  );
  {
    if (allResult.length === 0) {
      bookDetails.innerHTML = "";
      bookContainer.innerHTML = "No Result Found";
    } else {
      let countResultFound = document.createElement("p");
      countResultFound.innerHTML = `${allResult.length} books found`;
      bookDetails.innerHTML = "";
      bookDetails.appendChild(countResultFound);
      bookContainer.innerHTML = "";

      allResult.forEach((book) => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("col-4");
        newDiv.innerHTML = `
        <div class="col-4 card my-3" style="width: 18rem; height: auto">
        <img class="card-img-top img-fluid" style="width: auto; height: 250px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="">

        <div class="card-body" style="height: 180px; overflow: hidden" >
          <h4 class="card-title fw-bold text-primary">${book.title}</h4>
          <p class="card-subtitle text fs-5 text-info mb-2" >${book.author_name[0]}</p>
          <p class="card-subtitle text fs-6 fw-lighter text-secondary" >${book.publisher[0]}</p>
          <p class="card-subtitle text fs-6 fw-lighter text-secondary mb-2" >First Publish:${book.first_publish_year}</p>
        </div>
    </div>`;

        bookContainer.appendChild(newDiv);
      });
    }
  }
};
