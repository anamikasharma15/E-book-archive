

searchBook = () => {
    const searchField = document.getElementById("search-field");
    const bookList = document.getElementById("book-list");
    const searchResult = document.getElementById("search-result");
    const emptyInput = document.getElementById("emptyInput");
    const errorMassage = document.getElementById("error-msg");
  
    const searchValue = searchField.value;
    bookList.textContent = "";
    searchResult.innerText = "";
    errorMassage.style.display = "none";
    if (searchValue === "") {
      sppiner("hidden");
      emptyInput.style.display = "block";
      errorMassage.style.display = "none";
      searchResult.innerText = "";
      bookList.textContent = "";
    } 
    else {
      sppiner("visible");
      emptyInput.style.display = "none";
      //  book search url
      const url = `https://openlibrary.org/search.json?q=${searchValue}`;
  
      fetch(url)
        .then((res) => res.json())
        .then((data) => { 
            displayBook(data);
        });
    }
    searchField.value = "";
  };
  
  displayBook = (data) => {
    const searchResult = document.getElementById("search-result");
    searchResult.innerText = `totals ${data.numFound} result found`;
  
    console.log("total-data", data);
  
    
    const errorMassage = document.getElementById("error-msg");
    if (data.numFound === 0) {
      searchResult.innerText = "";
      errorMassage.style.display = "block";
      sppiner("hidden");
    }
     else {
      errorMassage.style.display = "none";
      const bookList= document.getElementById("book-list");
  
      data?.docs.forEach((item) => {
        const div = document.createElement("div");
        console.log(item);

        //   image show part
        item?.cover_i
          ? (imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`)
          : (imgUrl = "image/error.png");
  
        //  author name part
        item?.author_name ? (auth = item?.author_name.join()) : (auth = "not available");
        //  publisher name part
        item?.publisher[0] ? (publisher = item?.publisher[0]) : (publisher = "not available");
        //  first publish date 
        item?.publish_date[0] ? (publishDate = item?.publish_date[0]) : (publishDate = "not available");
  
        console.log(item?.title);
  
        div.innerHTML = `
         <div class="col">
             <div class="card">
                  <img height='450px'  src=${imgUrl}  class="card-img-top" alt="...">
                 <div class="card-body">
                     <h5 id="author" class="card-title">${item?.title}</h5>
                     <h6 class="card-text">Author:  <span class ="text-success"> ${auth} </span></h6>
                     <h6 class="card-text">Publisher: <span class ="text-success"> ${publisher} </span> </h6>
                     <h6 class="card-text">First Published: <span class ="text-success">  ${publishDate} </span> </h6>
  
                 </div>
             </div>
         </div>
         `;
        bookList.appendChild(div);
        sppiner("hidden");
      });
    }
  };
  
  // sppiner function part
  sppiner = (property) => {
    const sppiner = document.getElementById("sppiner");
    sppiner.style.visibility = property;
  };
  