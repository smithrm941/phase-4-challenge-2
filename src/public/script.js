document.addEventListener("DOMContentLoaded", function(event) {
  const individualReviews = document.querySelectorAll('.individual-review')

  for (let i = 0; i<individualReviews.length; i++){

    let deleteButton = individualReviews[i].childNodes[5]

    deleteButton.addEventListener("click", () => {
      console.log('Clicked a trash can!')
    })

  }
});
