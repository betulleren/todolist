const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


//yeni görev ekleme fonksiyonu
function addTask() {
    if (inputBox.value === '') {
        alert("You need to write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function() {
            editTask(li);
        };
        li.appendChild(editBtn);
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "\u00d7";
        deleteBtn.onclick = function() {
            li.remove();
            saveData();
        };
        li.appendChild(deleteBtn);
    }
    inputBox.value = "";
    saveData();
}

function editTask(li) {
    const newText = prompt("Enter the new text for the task:", li.firstChild.nodeValue);
    if (newText !== null) { //null dönerse bir işlemm yapılmaz
        const regulatedText = newText.trim(); //metin başı sonu boşlukları temizler
        if (regulatedText !== "") {
            li.firstChild.nodeValue = regulatedText;
            saveData();
        } else {
            alert("Task text cannot be empty.");
        }
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {//görevi silme 
        e.target.parentElement.remove();
        saveData();
    }
}, false); //tıklanan ögenin seçilmesini sağlar.bubbling devre dışı kalır.

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showList();