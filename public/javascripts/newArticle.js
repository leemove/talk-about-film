$(function () {
  $(function() {
    var editor = editormd("editormd", {
        path : "/lib/editor.md-master/lib/" // Autoload modules mode, codemirror, marked... dependents libs path
    });

    /*
    // or
    var editor = editormd({
        id   : "editormd",
        path : "../lib/"
    });
    */
});
})