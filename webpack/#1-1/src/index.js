import * as $ from 'jquery'
import Post from '@models/Post'
import json from '@/assets/json'
import csv from '@/assets/data.csv'
import WebpackLogo from '@/assets/logo'
import './styles/styles.css'
import './styles/sass.sass'

const post = new Post('Webpack title:', WebpackLogo)

$('pre').addClass('code2').html(post.toString())

console.log('CSV', csv)