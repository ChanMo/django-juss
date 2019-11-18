django.jQuery("select.juss-filter-select").on("change", function(e) {
  var href = django.jQuery("option:selected", this).data("href");
  window.location.href = href;
});
