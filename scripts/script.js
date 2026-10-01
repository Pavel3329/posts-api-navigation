// Реализовать функционал переключения между постами. В качестве API использовать https://jsonplaceholder.typicode.com/posts/

// Страница должна содержать 2 кнопки (вперед, назад), которые переключают к следующему и предыдущему посту соответственно.
// При загрузке страницы должен отправляться запрос на получение поста с id=1.

const postContainer = document.querySelector("#root");
const prevPostBtn = document.querySelector(".left");
const nextPostBtn = document.querySelector(".right");

const BASE_URL = "https://jsonplaceholder.typicode.com";

let postNumber = Number(localStorage.getItem("postNumber")) || 1;

let isDisabled = false;

const getPostById = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postNumber}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// getPostById(1);

const renderPost = (post) => {
  postContainer.innerHTML = "";

  const title = document.createElement("p");
  const body = document.createElement("p");
  const id = document.createElement("h3");
  const continer = document.createElement("div");

  title.textContent = post.title;
  body.textContent = post.body;
  id.textContent = post.id;

  continer.classList.add("post");
  title.classList.add("subheader");
  continer.append(id, title, body);
  postContainer.append(continer);
};

const loadPost = async () => {
  const postData = await getPostById();
  renderPost(postData);
};

loadPost();

nextPostBtn.addEventListener("click", () => {
  if (isDisabled) return;

  isDisabled = true;

  if (postNumber < 100) {
    postNumber++;
    localStorage.setItem("postNumber", postNumber);
    loadPost();
  }
  setTimeout(() => {
    isDisabled = false;
  }, 350);
});

prevPostBtn.addEventListener("click", () => {
  if (isDisabled) return;

  isDisabled = true;
  if (postNumber > 1) {
    postNumber--;
    localStorage.setItem("postNumber", postNumber);
    loadPost();
  }
  setTimeout(() => {
    isDisabled = false;
  }, 350);
});

// ........................................................................

// 1. localStorage - оставаться на том же посте после перезагрузки страницы.

// 2. В самом начале страницы сделать так, что-как будто бы что-то грузится. (анимация)

// 3. выключить кнопку на 0 и на 100 последнем. - ограничить клики.

// 4. ограничить выключатель влево,- вправо, что-бы было чётко..
// в диапазоне 350мс - Один клик! (disabled) - Debounce - не даём многократно нажать на кнопку.. - Он будет нажимать, запрос будет уходить, но кнопку надо дисаблить, на 350мс. на один клик..

// ---- .localStorage 2.Loading, 3.Валидация 4.Debounce (350ms - 1 click) ----

// ...........

// каждый раз когда загружается getPostById обновляется/ Алзо, между загрузками postContainer...

// - Залить в GitHub
