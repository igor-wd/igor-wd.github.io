import * as $ from 'jquery'
import Post from '@models/Post'
// import json from './assets/json'
// import xml from './assets/data.xml'
import html from './index.html'
import csv from './assets/data.csv'
import './styles/styles.css'
import './styles/sass.sass'

const post = new Post('Webpack Post Title')

$('pre').addClass('code').html(post.toString())

// console.log( 'JSON:', json)
// console.log( 'XML:', xml)
console.log( 'CSV:', csv)