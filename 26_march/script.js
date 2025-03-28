let users = [];


function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name === "" || email === "") {
        alert("Please enter name and email!");
        return;
    }



    let newUser = { id: users.length + 1, name, email };

    addUserToList(newUser, (user) => {
        users.push(user);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
    });

}




function addUserToList(user, callback) {
    let userList = document.getElementById("userList");
    let li = document.createElement("li");
    li.innerHTML = ` ${user.name} - ${user.email}    ---  <button onclick="editUser(${user.id})">Edit </button>`;
    li.id = `user-${user.id}`;
    userList.appendChild(li);
    callback(user);
}



function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                addUserToList(user, () => {}); 
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}




function editUser(userId) {
    let user = users.find(user => user.id === userId);
    if (!user) return alert("User not found!");

    let newName = prompt("Enter new name:", user.name);
    let newEmail = prompt("Enter new email:", user.email);

    if (newName && newEmail) {
        updateUser(userId, newName, newEmail).then(updatedUser => {
            document.getElementById(`user-${userId}`).innerHTML = 
                `${updatedUser.name} - ${updatedUser.email} <button class="edit" onclick="editUser(${updatedUser.id})">Edit</button>`;

        }).catch(error => console.error("Update failed:", error));
    }


}



function updateUser(userId, newName, newEmail) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            let user = users.find(u => u.id === userId);
            if (user) {
                user.name = newName;
                user.email = newEmail;
                resolve(user);
            } else {
                reject("User is not found!");
            }
        }, 1000);
    });
}