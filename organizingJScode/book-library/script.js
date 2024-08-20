// DIALOG
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + .add-btn");
const closeButton = document.querySelector("dialog > form > button");

showButton.addEventListener("click", () => {  //"Show the dialog" button opens the dialog modally
  dialog.showModal();
});

closeButton.addEventListener("click", () => {  //"Close" button closes the dialog
  dialog.close();
});

dialog.addEventListener("click", e => {  // Close on outside/backdrop click
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  })


// BOOK LIBRARY
let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.setRead = function (readStatus) {
    this.readStatus = readStatus;
}

// SHOW EXISTING BOOK(before any input from user)
const book1 = new Book('Programming for Beginner', 'Akmal Zuckerberg', '115', true);
const book2 = new Book('Algorithm & Data Structure', 'Amir bin Salman', '223', true);
const book3 = new Book('Database', 'Jeffrey D. Ullman', '179', false);
const existedBooks = [book1, book2, book3];
function showExistedBook() {
    for(let i = 0; i < 3; i++) {
        addBookToLibrary(existedBooks[i]);
        updateBooksGrid();
    }
}

document.addEventListener("DOMContentLoaded", () => {  //ensures that all DOM elements are ready before showExistedBook() is called.
    showExistedBook();
});

// FORM

const form = document.querySelector('#form');
form.addEventListener('submit', addBook);

function addBook(e) {
    e.preventDefault();
    if(addBookToLibrary(getBookFromInput())) {
        updateBooksGrid();
        form.reset()
        dialog.close();
    }
    else {
        alert("This book already exists in your library");
    }
}

function getBookFromInput() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readStatus = document.querySelector('#readStatus').checked;
    return new Book (title, author, pages, readStatus);
}

function addBookToLibrary(newBook) {
    if(myLibrary.some((book) => book.title === newBook.title)) return false;
    myLibrary.push(newBook);
    return true;
}

// BOOKS GRID

function updateBooksGrid() {
    resetGrid();
    for(let element of myLibrary) {
        createBookCard(element);
    }
}

const cardsContainer = document.querySelector(".cards-container");
function resetGrid() {
    cardsContainer.innerHTML = "";
}

function createBookCard(book) {
    const card = document.createElement('div');
    const top = document.createElement('div');
    const bookTitle = document.createElement('p');
    const desc = document.createElement('div');
    const bookPages = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bottom = document.createElement('div');
    const removeBtn = document.createElement('button');
    const statusBtn = document.createElement('button');

    card.classList.add('card');
    top.classList.add('top');
    bookTitle.classList.add('book-title');
    desc.classList.add('desc');
    bookPages.classList.add('book-pages');
    bookAuthor.classList.add('book-author');
    bottom.classList.add('bottom');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('remove-btn');
    statusBtn.classList.add('btn');
    statusBtn.classList.add('status-btn');

    bookTitle.textContent = book.title;
    bookPages.textContent = `${book.pages} pages`;
    bookAuthor.textContent = book.author;
    removeBtn.textContent = "Remove";
    if(book.readStatus) {
        statusBtn.textContent = "Read";
        statusBtn.classList.add('read');
    } else {
        statusBtn.textContent = "Unread";
        statusBtn.classList.add('unread');
    }

    desc.appendChild(bookPages);
    desc.appendChild(bookAuthor);
    top.appendChild(bookTitle);
    top.appendChild(desc);
    bottom.appendChild(removeBtn);
    bottom.appendChild(statusBtn);
    card.appendChild(top);
    card.appendChild(bottom);

    cardsContainer.appendChild(card);
}

// CARD MANIPULATION

const booksGrid = document.querySelector('.cards-container');
booksGrid.addEventListener('click', checkBooksGridInput);

function checkBooksGridInput(e) {
    if(e.target.classList.contains('remove-btn')) {
        removeFromLibrary(e.target.parentNode.parentNode.firstChild.firstChild.textContent);
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    } else if(e.target.classList.contains('status-btn')) {
        if(e.target.textContent === 'Read') {
            getBookFromLibrary(e.target.parentNode.parentNode.firstChild.firstChild.textContent).setRead(false);
            e.target.textContent = 'Unread';
            e.target.classList.remove('read');
            e.target.classList.add('unread');
        } else {
            getBookFromLibrary(e.target.parentNode.parentNode.firstChild.firstChild.textContent).setRead(true);
            e.target.textContent = 'Read';
            e.target.classList.remove('unread');
            e.target.classList.add('read');
        }
    }
}

function removeFromLibrary(bookTitle) {
    myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
}

function getBookFromLibrary(bookTitle) {
    for(book of myLibrary) {
        if(book.title === bookTitle) {
            return book;
        }
    }
}