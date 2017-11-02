module.exports = {
  getFirstSrc (htmlContent) {
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let arr = htmlContent.match(imgReg);
    let firstImgSrc = ''
    if (arr) {
      let srcs = arr[0].match(srcReg)
      if (srcs) {
        firstImgSrc = srcs[0].slice(5, -1) || ''
        return firstImgSrc
      }
    }
    return null
  }
}