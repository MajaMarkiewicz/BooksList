let allBooks = [
    {
      cover: {
        large: 'images/CleanArchitecture_big.jpg',
        small: 'images/CleanArchitecture_small.jpg'
      },
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      releaseDate: '09/2017',
      pages: 432,
      link: 'https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164'
    },
    {
      cover: {
        large: 'images/CleanCode_big.jpg',
        small: 'images/CleanCode_small.jpg'
      },
      title: 'Clean Code',
      author: 'Robert C. Martin',
      releaseDate: '08/2008',
      pages: 464,
      link: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882'
    },
    {
      cover: {
        large: 'images/EffectiveJava_big.jpg',
        small: 'images/EffectiveJava_small.jpg'
      },
      title: 'Effective Java',
      author: 'Joshua Bloch',
      releaseDate: '12/2017',
      pages: 412,
      link: 'https://www.amazon.com/Effective-Java-Joshua-Bloch-dp-0134685997/dp/0134685997/ref=mt_paperback?_encoding=UTF8&me=&qid='
    },
    {
      cover: {
        large: 'images/PragmaticProgrammer_big.jpg',
        small: 'images/PragmaticProgrammer_small.jpg'
      },
      title: 'Pragmatic Programmer',
      author: 'David Thomas & Andrew Hunt',
      releaseDate: '10/1999',
      pages: 352,
      link: 'https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X'
    },
    {
      cover: {
        large: 'images/TheSelfTaughtProgrammer_big.jpg',
        small: 'images/TheSelfTaughtProgrammer_small.jpg'
      },
      title: 'The Self-Taught Programmer',
      author: 'Cory Althoff',
      releaseDate: '01/2017',
      pages: 299,
      link: 'https://www.amazon.com/Self-Taught-Programmer-Definitive-Programming-Professionally-ebook/dp/B01M01YDQA'
    },
    {
      cover: {
        large: 'images/PracticalModernJS_big.jpg',
        small: 'images/PracticalModernJS_small.jpg'
      },
      title: 'Practical Modern JavaScript',
      author: 'Nicolas Bevacqua',
      releaseDate: '07/2017',
      pages: 334,
      link: 'https://www.amazon.com/Practical-Modern-JavaScript-Dive-Future/dp/149194353X'
    }
]

let processedBooks = []

let modal
let modalImg

// Listeners

// On body load
function init() {
    updateBooks()
    restoreFormView();
    addListener("radioButtonPages", "click", sortByPages)
    addListener("radioButtonAuthor", "click", sortByAuthor)
    addListener("radioButtonReleaseDate", "click", sortByReleaseDate)
    addListener("minPages", "input", filterNumPages)
    addListener("clearButton", "click", clear)

    addListener("close", "click", hideModal)
    modal = document.getElementById('modal');
    modalImg = document.getElementById("modalImg");
}

function addListener(viewId, event, listener) {
    document.getElementById(viewId).addEventListener(event, listener);
}

document.addEventListener("keydown", function (e) {
    if(e.altKey  && e.key === "r") {
        clear();
    }
});

function sortByPages() {
    window.localStorage.setItem("sortingKey", "byPages")
    updateBooks()
}

function sortByAuthor() {
    window.localStorage.setItem("sortingKey", "byAuthor")
    updateBooks()
}


function sortByReleaseDate() {
    window.localStorage.setItem("sortingKey", "byReleaseDate")
    updateBooks()
}

function filterNumPages() {
    let minPages = document.getElementById('minPages').value
    window.localStorage.setItem("minPages", minPages)
    updateBooks()
}

function clear() {
    window.localStorage.clear()
    updateBooks()
    clearFormView();
}

function updateBooks() {
    let sortingKey = window.localStorage.getItem("sortingKey")
    let minPagesString = window.localStorage.getItem("minPages")
    let minPagesNumber = Number(minPagesString)
    processedBooks = processBooks(allBooks, minPagesNumber, sortingKey);
    updateBooksView(processedBooks)
}

// Processing

function filterBooks(array, minPagesNumber) {
    return array.filter(function (elem) {
      return elem.pages > minPagesNumber
    })
}

function sortBooks(array, sortingKey) {
    array = array.slice(0);
    if ( sortingKey === "byPages" ) {
        array.sort(function(a,b) {
            return a.pages - b.pages;
        });
    } else if ( sortingKey === "byAuthor" ) {
        array.sort(function(a,b) {
            let splitA = a.author.split(" ");
            let splitB = b.author.split(" ");
            let lastA = splitA[splitA.length - 1];
            let lastB = splitB[splitB.length - 1];
            return lastA < lastB ? -1 : lastA > lastB ? 1 : 0;
        });
    } else if ( sortingKey === "byReleaseDate" ) {
        array.sort(function(a,b) {
            let aRev = a.releaseDate.split('/').reverse().join();
            let bRev = b.releaseDate.split('/').reverse().join();
            return aRev < bRev ? -1 : (aRev > bRev ? 1 : 0);
        });
    }
    return array;
}

function processBooks(allBooks, minPagesNumber, sortingKey) {
  let filtered = filterBooks(allBooks, minPagesNumber);
  let processed = sortBooks(filtered, sortingKey);
  return processed;
}

// View update

function updateBooksView(processedBooks) {
    let bookWrapperHtml = function updateHTML() {
        let fullHTML = "";
        for (let i=0; i<processedBooks.length; i++) {
            fullHTML += "<li class=\"book flex-wrapper-book\"> "+
                            "<p class=\"number\">" + (i+1) + "</p>"+
                            "<img class=\"cover\" id=\"" + i + "\" onclick=\"displayModal(this)\" src=\"" + processedBooks[i].cover.small + "\" alt=\"Cover of " + processedBooks[i].title + "\"> "+
                            "<div class=\"book-description\">"+
                                "<h3>" + processedBooks[i].title + "</h3>"+
                                "<hr class=\"line--short-solid\"/>"+
                                "<h4>By " + processedBooks[i].author + "</h4>"+
                                "<p>Release Date: " + processedBooks[i].releaseDate + "</p>"+
                                "<p>Pages: " + processedBooks[i].pages + "</p>"+
                                "<p>Link: <a href=\"" + processedBooks[i].link + "\">shop</a></p>"+
                            "</div>"+
                        "</li>"
        }
        return fullHTML;
    };
    document.getElementById("bookWrapper").innerHTML = bookWrapperHtml();
}

function clearFormView () {
  document.getElementById("minPages").value=''
  let sortingButtons  = document.getElementsByName("sort");
  for(let i=0; i<sortingButtons.length; i++) {
      sortingButtons[i].checked = false;
  }
}

function restoreFormView () {
    let sortingKey = window.localStorage.getItem("sortingKey")
    let minPagesString = window.localStorage.getItem("minPages")

    document.getElementById("minPages").value= minPagesString
    let sortingButtons  = document.getElementsByName("sort");
    if (sortingKey === "byPages") sortingButtons[0].checked = true;
    if (sortingKey === "byReleaseDate") sortingButtons[1].checked = true;
    if (sortingKey === "byAuthor") sortingButtons[2].checked = true;
}

function displayModal(element) {
    let i = Number(element.id);
    modalImg.src = processedBooks[i].cover.large;
    modalImg.alt = element.alt
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    hideModal();
  }
}
