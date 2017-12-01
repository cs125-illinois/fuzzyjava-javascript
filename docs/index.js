/* global $, CodeMirror, fuzzyjava, alert */

$(function () {
  $('.example').each((unused, elem) => {
    console.log(elem)
    let editor = $(elem).find('textarea').first()
    let source = CodeMirror.fromTextArea($(editor).get(0), {
      mode: 'text/x-java',
      lineNumbers: true,
      viewportMargin: Infinity,
      matchBrackets: true
    })
    let compile = () => {
      try {
        let output = "// try compiling again\n" + new fuzzyjava(source.getValue()).generate().validate().output
        $(elem).find('.output > pre').text(output.trim())
      } catch (err) {
        $(elem).find('.output > pre')
          .html(`<span class="text-danger">${ err }</span>`)
      }
    }
    $(editor).parent().keypress(event => {
      if (!(event.which === 115 && event.ctrlKey) && !(event.which === 19)) {
        return true
      }
      event.preventDefault()
      compile()
    })
    $(elem).find('button').first().click(() => {
      compile()
    })
  })
})
