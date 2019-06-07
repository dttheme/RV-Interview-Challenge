const API_RESOURCE = "https://api.myjson.com/bins/18ce70";

// Create the type of element you pass in the parameters
const createNode = element => {
  return document.createElement(element);
};
// Append the second parameter(element) to the first one
const append = (parent, el) => {
  return parent.appendChild(el);
};
// Manipulate date
const formatDate = date => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let formattedDate = new Date(date).toLocaleTimeString("en-us", options);
  return formattedDate.slice(0, formattedDate.length - 12);
};

const formatTime = timestamp => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

// Static elements from HTML
const messagesWrapper = document.querySelector(".messages");
const dateWrapper = document.querySelector(".header__date");

fetch(API_RESOURCE)
  .then(res => res.json())
  .then(data => {
    console.log(data.data);

    const messages = data.data.messages,
      date = data.data.conversationDate;
    return messages.map(message => {
      // Data variables to append
      const formattedDate = formatDate(date),
        formattedTime = formatTime(message.timestamp);

      // Check for active user and apply correct class name
      // In a real application, I would be checking against the active user data held in state
      const user = message.username.split(" ").join("");
      const userStyle = user === "CharlieHemn" ? "activeUser" : "otherUser";
      const focused = message.focused ? "focused" : "";

      // Create nodes
      let li = createNode("li"),
        userImg = createNode("img"),
        userName = createNode("span"),
        messageTime = createNode("span"),
        userMessage = createNode("span"),
        contentWrapper = createNode("div"),
        messageMeta = createNode("div");

      // Node class names
      li.className = `message message__${userStyle} ${focused}`;
      userImg.className = `message__userImg`;
      userName.className = `message__userName`;
      messageTime.className = `message__messageTime`;
      contentWrapper.className = "message__contentWrapper";
      messageMeta.className = "message__meta";

      // Assign data to nodes
      userImg.src = message.image;
      userName.innerHTML = message.username;
      messageTime.innerHTML = formattedTime;
      userMessage.innerHTML = message.message;
      dateWrapper.innerHTML = formattedDate;

      append(messageMeta, userName);
      append(messageMeta, messageTime);
      append(contentWrapper, userMessage);
      append(contentWrapper, messageMeta);
      append(li, userImg);
      append(li, contentWrapper);
      append(messagesWrapper, li);
    });
  })
  .catch(err => console.log(err));
