$(document).ready(function() {
  // Flip card on click
  $(".card").click(function() {
    $(this).toggleClass("flipped");
  });

  // Optional: horizontal scroll slider with mouse wheel
  $(".card-stack").on("wheel", function(e) {
    e.preventDefault();
    this.scrollLeft += e.originalEvent.deltaY;
  });
});

