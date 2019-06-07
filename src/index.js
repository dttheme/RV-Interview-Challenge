const API_RESOURCE = "https://api.myjson.com/bins/18ce70";

// Create the type of element you pass in the parameters
function createNode(element) {
  return document.createElement(element);
}
// Append the second parameter(element) to the first one
function append(parent, el) {
  return parent.appendChild(el);
}

const messagesWrapper = document.querySelector(".messages");
const dateWrapper = document.querySelector(".date");

fetch(API_RESOURCE)
  .then(res => res.json())
  .then(data => {
    console.log(data.data);
    // data variables to append
    let messages = data.data.messages;
    let date = data.data.conversationDate;

    dateWrapper.innerHTML = `${date}`;

    return messages.map(message => {
      // create nodes
      let li = createNode("li"),
        userImg = createNode("img"),
        userName = createNode("span"),
        userMessage = createNode("span");

      //node class names
      li.className = `message`;
      userImg.className = `userImg`;
      // assign data to nodes
      userImg.src = message.image;
      userName.innerHTML = `${message.username}`;
      userMessage.innerHTML = `${message.message}`;
      append(li, userImg);
      append(li, userName);
      append(li, userMessage);
      append(messagesWrapper, li);
    });
  })
  .catch(err => console.log(err));
