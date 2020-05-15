// Book constructor
function Book (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI (){}

// Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById("book-list");
    // Create tr
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

    // Show alerts
    UI.prototype.showAlert = function(message, className){
        // Create Div
        const div = document.createElement("div");
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after three seconds
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
    }

    // Delete Book
    UI.prototype.deleteBook = function(target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove();
        }
    }

    // Clear Fields
    UI.prototype.clearFields = function (){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }

// Event Listener for Add Book
document.getElementById("book-form").addEventListener("submit", function(e){
    // Get form values
    const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI Object
    const ui = new UI();

    // Validate
    if (title === "" || author === "" || isbn === ""){
        // Error
        ui.showAlert("Fill in ALL fields dipshit!", "error");
    } else {
        // Add Book To List
        ui.addBookToList(book);

        //Show success
        ui.showAlert("Yay! Book added", "success");

        // CLear Fields
        ui.clearFields();
        }

    e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function(e){
    
    // Instantiate UI Object
    const ui = new UI();
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert("Book Removed", "success");

    e.preventDefault();
});