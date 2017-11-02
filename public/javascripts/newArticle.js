$(function () {
  var editor = editormd("editormd", {
    path: "/lib/editor.md-master/lib/" // Autoload modules mode, codemirror, marked... dependents libs path
  });
  $('#datetimepicker').datepicker({});
  function submitHandel() {
    var data = {
      title: $('#title').val(),
      name: $('#file').val(),
      time: $('#datetimepicke').val(),
      content: $('#md').html(),
      author: $('#author').val(),
    }
    $.post('/article/new', data, function (data) {
      console.log(data)
      // window.location = "/"
    })
    return false
  }
  $('#submit').on('click', submitHandel)
});