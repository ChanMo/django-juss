tinymce.init({
  selector:'textarea',
    height: 600,
    language: 'zh_CN',
    language_url: '/static/juss/widgets/zh_CN.js',
    plugins: 'image lists autolink fullscreen table media',
    menubar: false,
  toolbar: 'styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright | numlist bullist | image media table | fullscreen',
  images_upload_handler: async function (blobInfo, success, failure) {
    const data = {'source':blobInfo.base64()}
    fetch('/attachments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(data)
    }).then((res)=>{
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    }).then(res => {
      success(res.source)
    }).catch(err => failure(err))
  }
})
