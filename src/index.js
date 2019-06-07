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
  let formattedDate;
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };
  formattedDate = new Date(date).toLocaleTimeString("en-us", options);
  formattedDate.slice(0, formattedDate.length - 10);
  return formattedDate.slice(0, formattedDate.length - 10);
};

// static elements from HTML
const messagesWrapper = document.querySelector(".messages");
const dateWrapper = document.querySelector(".header__date");

fetch(API_RESOURCE)
  .then(res => res.json())
  .then(data => {
    console.log(data.data);

    // data variables to append
    let messages = data.data.messages;
    let date = data.data.conversationDate;
    let formattedDate = formatDate(date);

    return messages.map(message => {
      const user = message.username;
      // create nodes
      let li = createNode("li"),
        userImg = createNode("img"),
        userName = createNode("span"),
        userMessage = createNode("span"),
        contentWrapper = createNode("div"),
        messageMeta = createNode("div");

      //node class names
      li.className = `message`;
      userImg.className = `message__userImg`;
      userName.className = `message__userName`;
      contentWrapper.className = "message__contentWrapper";
      messageMeta.className = "message__meta";

      // assign data to nodes
      userImg.src = message.image;
      userName.innerHTML = `${message.username}`;
      userMessage.innerHTML = `${message.message}`;
      dateWrapper.innerHTML = `${formattedDate}`;

      append(messageMeta, userName);
      //   append(messageMeta, userName);
      append(contentWrapper, userMessage);
      append(contentWrapper, messageMeta);
      append(li, userImg);
      append(li, contentWrapper);
      append(messagesWrapper, li);
    });
  })
  .catch(err => console.log(err));
