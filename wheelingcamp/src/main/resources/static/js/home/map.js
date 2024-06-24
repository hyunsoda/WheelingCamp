console.log("연결");

function loadLink() {
  const thumbnail = fetch("/camparea/urlThumbnail")
    .then((resp) => resp.text())
    .then((result) => {
      console.log(result);
    });
  console.log(thumbnail);
}

document.addEventListener("DOMContentLoaded", loadLink());
