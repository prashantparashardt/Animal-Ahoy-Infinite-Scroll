const imageContainer = document.getElementById("image-container");
const loading = document.getElementById("loader");

//EndPoints List
endPointList = [
  "https://aws.random.cat/meow",
  "https://random.dog/woof.json",
  "https://randomfox.ca/floof/",
];

//Length of EndPoint List
endPointLength = endPointList.length;

//Function to Get Random post from Endpoints
async function getRandomImage() {
  const RandomEndPoint = Math.floor(Math.random() * Math.floor(endPointLength));
  try {
    const res = await fetch(endPointList[RandomEndPoint]);
    const data = await res.json();
    switch (RandomEndPoint) {
      case 0:
        imgUrl = data.file;
        break;
      case 1:
        imgUrl = data.url;
        break;
      case 2:
        imgUrl = data.image;
        break;
    }
    return imgUrl;
  } catch (error) {
    console.log(error);
  }
}

// let imageUrls = [];
let imageUrls = new Set();

//Function to Fetch initial 15 posts
async function getInitialImages() {
  while (imageUrls.size < 15) {
    imageUrls.add(await getRandomImage());
  }
  showImages([...imageUrls]);
}

//Function to show images on UI
// async function showImages() {
//   [...imageUrls].slice(Math.max([...imageUrls].length - 15, 0)).map((imag) => {
//     const imagEl = document.createElement("div");
//     imagEl.classList.add("card");
//     imagEl.innerHTML = `
//       <img src=${imag} />
//       `;
//     imageContainer.appendChild(imagEl);
//   });
// }
async function showImages(imgs) {
  imgs.map((imag) => {
    const imagEl = document.createElement("div");
    imagEl.classList.add("card");
    imagEl.innerHTML = `
      <img src=${imag} />
      `;
    imageContainer.appendChild(imagEl);
  });
}

//Function Call to get Initial 15 Images
getInitialImages();

//Function to Fetch next 5 posts & Showing on UI
async function getNextTenImages(n) {
  console.log(n);
  while (imageUrls.size < n + 5) {
    imageUrls.add(await getRandomImage());
  }
  showImages([...imageUrls].slice(imageUrls.size - 5, imageUrls.size));
}

//Showing Loader & Fetch more posts
function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      getNextTenImages(imageUrls.size);
    }, 300);
  }, 2000);
}

//Infinite Scroll
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    showLoading();
  }
});

// imageContainer.addEventListener("scroll", (e) => {
//   console.log(e);
//   if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
//     showLoading();
//   }
// });
