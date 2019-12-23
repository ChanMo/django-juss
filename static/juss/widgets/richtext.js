tinymce.init({
  selector:'textarea',
    height: 600,
    language: 'zh_CN',
    language_url: '/static/bower_components/tinymce/zh_CN.js',
    plugins: 'image lists autolink fullscreen table media',
    menubar: false,
    toolbar: 'styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright | numlist bullist | image media table | fullscreen'
})
