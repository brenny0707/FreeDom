$l(() => {
  $l('.add-cat-button').on('click', () => {
    debugger
    $l.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit=1&rating=g&tag=cat",
      success: (res) => {
        debugger
        const node = document.createElement("li");
        node.className += 'cat-list-li';
        const imgUrl = res.data.image_url;
        node.innerHTML = `<img src="${imgUrl}">`;
        $l('.cat-list').append(node);
      },
      error: (res) => console.log(res),
    })
  });
});

$l(() => {
  $l('.add-dog-button').on('click', () => {
    debugger
    $l.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit=1&rating=g&tag=dog",
      success: (res) => {
        debugger
        const node = document.createElement("li");
        node.className += 'dog-list-li';
        const imgUrl = res.data.image_url;
        node.innerHTML = `<img src="${imgUrl}">`;
        $l('.dog-list').append(node);
      },
      error: (res) => console.log(res),
    })
  });
});


$l(() => {
  $l('.remove-cat-list-li-button').on('click', () => {
    $l('.cat-list-li').removeClass("cat-list-li")
  })
});

$l(() => {
  $l('.remove-dog-list-li-button').on('click', () => {
    $l('.dog-list-li').removeClass("dog-list-li")
  })
});
