const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const readStatus = document.querySelector("#readStatus");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };
}

function addBookToLibrary() {
    let variable = toCamelCase(titleInput);
    let currentBook = `const ${variable} = new Book('${titleInput}', '${authorInput}', '${pagesInput}', '${readInput}');`
    myLibrary.push(currentBook);
}

function toCamelCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');

console.log(theHobbit.info());  // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"