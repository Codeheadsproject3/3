$(document).ready(function() {
    // Getting references to the name input and catch container, as well as the table body
    var userInput = $("#user-name");
    var UsersList = $("tbody");
    var UserContainer = $(".user-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Catch
    $(document).on("submit", "#user-form", handleUserFormSubmit);
    $(document).on("click", ".delete-user", handleDeleteButtonPress);
  
    // Getting the initial thread
    getUsers();
  
    // A function to handle what happens when the form is submitted to create/record a new catch
    function handleUserFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!userInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertUser function and passing in the value of the name input
      upsertUser({
        name: userInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an author. Calls getUsers upon completion
    function upsertUser(userData) {
      $.post("/api/users", userData)
        .then(getUsers);
    }
  
    // Function for creating a new list row for authors
    function createUsersRow(userData) {
      var newTr = $("<tr>");
      newTr.data("user", userData);
      newTr.append("<td>" + userData.name + "</td>");
      if (userData.Posts) {
        newTr.append("<td> " + userData.Posts.length + "</td>");
      } else {
        newTr.append("<td>0</td>");
      }
      newTr.append("<td><a href='/blog?user_id=" + userData.id + "'>My Catches</a></td>");
      newTr.append("<td><a href='/cms?user_id=" + userData.id + "'>Register a Catch</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'>Delete User</a></td>");
      return newTr;
    }
  
    // Function for retrieving users and getting them ready to be rendered to the page
    function getUsers() {
      $.get("/api/users", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createUsersRow(data[i]));
        }
        renderUsersList(rowsToAdd);
        userInput.val("");
      });
    }
  
    // A function for rendering the list of users to the page
    function renderUsersList(rows) {
      usersList.children().not(":last").remove();
      UserContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        usersList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no users
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an user before you can register a catch.");
      UserContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("user");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/users/" + id
      })
        .then(getUsers);
    }
  });