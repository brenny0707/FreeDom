$l(() => {
  $l('.add-cat-button').on('click', () => {
    debugger
    $l.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/search?q=cat&api_key=dc6zaTOxFJmzC&limit=1&rating=g",
      success: (res) => {
        debugger
        const node = document.createElement("li");
        const imgUrl = res.data.url;
        $l(node).append(res);
        $l('.cat-list').append(node);
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
