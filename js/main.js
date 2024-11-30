var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var bookmarksList = document.getElementById('bookmarksList');
var searchInput = document.getElementById('search');
var bookmarkForm = document.getElementById('bookmarkForm');
var emptyErr = document.getElementById('emptyErr');
var nameErr = document.getElementById('nameErr');
var urlErr = document.getElementById('urlErr');
var updateName = document.getElementById('updateName');
var updateUrl = document.getElementById('updateUrl');
var updateButton = document.getElementById('updateButton');
var updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
var alertModal = new bootstrap.Modal(document.getElementById('alertModal'));

document.addEventListener('DOMContentLoaded', fetchBookmarks);
document.getElementById('bookmarkForm').addEventListener('submit', addBookmark);
searchInput.addEventListener('input', searchBookmarks);

// function to check if the site name already exists
function isSiteNameExists(name) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    return bookmarks.some(bookmark => bookmark.name.toLowerCase() === name.toLowerCase());
}






// function to validate site name

function siteNameValidation() {
   
    if (siteName.value.trim() === "") {
        showModalAlert("Please fill in the site name.");
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
    } else if (siteName.value.trim().length < 3) {
    
        // showModalAlert("Site Name Must Contain At Least 3 Characters");
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
    } else {
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid");
    }
}

// function to check URL validity
function siteUrlValidation() {
    var url = siteUrl.value;
    if (!/^https?:\/\//.test(url)) {
        // showModalAlert("Please provide a valid URZL start with 'http://' or 'https://'.");
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
    } else {
        // showModalAlert("Please provide a valid URL start with 'http://' or 'https://'.");
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.add("is-valid");
    }
}





















// function to show alert modal
function showModalAlert(message) {
    document.getElementById("modalMessage").textContent = message;
    alertModal.show();
}

// function to add bookmark
function addBookmark(e) {
    e.preventDefault();

    const name = siteName.value.trim();
    const url = siteUrl.value.trim();

    // Validation for empty fields
    if (name === "" || url === "") {
        showModalAlert("Please fill in all fields.");
        return;
    }

    // Check if the site name already exists
    if (isSiteNameExists(name)) {
        showModalAlert("This site name already exists. Choose a different name.");
        return;
    }

    // Check the name and URL validity
    siteNameValidation();
    siteUrlValidation();

    // If either the validation fails, stop the process
    if (siteName.classList.contains("is-invalid") || siteUrl.classList.contains("is-invalid")) {
        return;
    }

    // Save the new bookmark
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Clear the form
    bookmarkForm.reset();

    // Refresh the bookmark list
    fetchBookmarks();
}

// function to fetch bookmarks and display them
function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarksList.innerHTML = "";

    bookmarks.forEach((bookmark, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td><a class="btn btn-visit" href="${bookmark.url}" target="_blank"><i class="fas fa-eye"></i> Visit</a></td>
            <td><button class="btn btn-update" onclick="openUpdateModal(${index})"><i class="fas fa-pencil-alt"></i> Update</button></td>
            <td><button class="btn btn-delete" onclick="deleteBookmark(${index})"><i class="fas fa-trash"></i> Delete</button></td>
        `;

        bookmarksList.appendChild(row);
    });
}

// function to open update modal
function openUpdateModal(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let bookmark = bookmarks[index];

    updateName.value = bookmark.name;
    updateUrl.value = bookmark.url;

    updateButton.onclick = () => updateBookmark(index);

    updateModal.show();
}

// function to update a bookmark
function updateBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks[index] = {
        name: updateName.value.trim(),
        url: updateUrl.value.trim()
    };

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    updateModal.hide();
    fetchBookmarks();
}

// function to delete bookmark
function deleteBookmark(index) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// function to search bookmarks
function searchBookmarks() {
    const searchQuery = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#bookmarksList tr');
    rows.forEach(row => {
        const siteName = row.cells[1].textContent.toLowerCase();
        if (siteName.includes(searchQuery)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}



































