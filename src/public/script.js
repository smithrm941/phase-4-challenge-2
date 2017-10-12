document.addEventListener("DOMContentLoaded", function(event) {
  const individualReviews = document.querySelectorAll('.individual-review')

  for (let i = 0; i<individualReviews.length; i++){

    let deleteButton = individualReviews[i].childNodes[5]
    let userReviewList = document.getElementById('user-review-list')
    let albumReviewList = document.getElementById('album-review-list')

    deleteButton.addEventListener("click", () => {
      if(userReviewList){

        let deleteConfirmationModal = individualReviews[i].childNodes[13]
        deleteConfirmationModal.style.display = "block";

      } else if(albumReviewList) {

        let deleteConfirmationModal = individualReviews[i].childNodes[16]
        deleteConfirmationModal.style.display = "block";

      }
    })

  }
});
