import css from './index.css'
import img from './images/img.png'
console.log('this is index.js')
const imgtag = new Image()
imgtag.src = img
const tag = document.getElementById('app')
tag.append(imgtag)