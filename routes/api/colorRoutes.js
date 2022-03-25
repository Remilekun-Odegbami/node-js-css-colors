const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args))
let count;

fetch('https://api.sampleapis.com/csscolornames/colors')
    .then(res => res.json())
    .then(data => {
        count = data.length
    })

// All colors
router.get('/', (req, res)=> {
    const URL = 'https://api.sampleapis.com/csscolornames/colors'

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/colors', {
                title: 'All Colors',
                name: 'Color List',
                data
            })
        })
})

// single-color 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/csscolornames/colors/${id}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-color', {
                    title: `${data.name}`,
                    name: `${data.name}`,
                    data,
                    count
                })
            
            } else {
                res.render('pages/404', {
                    title: '404 Error',
                    name: '404 Error'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})


module.exports = router