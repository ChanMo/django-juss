/**
 * filter
 */
django.jQuery("select.juss-filter-select").on("change", function(e) {
  var href = django.jQuery("option:selected", this).data("href");
  window.location.href = href;
});

/**
 * form tab
 */
var fieldsets = django.jQuery(".change-form #content-main > form > div").children("fieldset, .inline-group");
if (fieldsets.length) {
var html = '<ul class="juss-tabs">';
var title;
fieldsets.each(function(index) {
  title = django.jQuery(this).find('h2').html();
  title = title ? title : '基础信息';
  html += '<li onclick="changeTab(this)">'+title+'</li>';
});
html += '</ul>';
django.jQuery("#content-main").prepend(html);
django.jQuery(".juss-tabs li:first-child").addClass("tab-active");

django.jQuery(fieldsets[0]).show();
fieldsets.slice(1).each(function(){
  django.jQuery(this).hide();
});

/**
 * tabs切换事件
 */
function changeTab(e) {
  var index = django.jQuery(e).index();
  fieldsets.each(function(i){
    if(i == index) {
      django.jQuery(this).show();
    } else {
      django.jQuery(this).hide();
    }
  });
  if(!django.jQuery(e).hasClass("tab-active")) {
    django.jQuery(".tab-active").removeClass("tab-active");
    django.jQuery(e).addClass("tab-active");
  }
}
}

