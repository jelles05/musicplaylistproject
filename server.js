'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('dist'))
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Credentials', 'false')
    next()
})

const dao = require('.')
dao.connect()

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

function sendResponse (response, datas) {
    response.writeHead(HTTP_OK, { 'content-type': CONTENT_TYPE_JSON })
    response.end(JSON.stringify(datas))
}

app.get('/playlist', (request, response) => {
    dao.query('SELECT * FROM playlist', [], (result) => {
        sendResponse(response, result.rows)
    })
})

app.get('/playlist/:id', (request, response) => {
    dao.query('SELECT * FROM track WHERE playlist_id=$1', [parseInt(request.params.id)], (result) => {
        sendResponse(response, result.rows)
    })
})

app.post('/track', (request, response) => {
    dao.query('INSERT INTO track (playlist_id , title, uri,master_id) VALUES ($1, $2, $3, $4)',
        [request.body.playlistId, request.body.title, request.body.uri, request.body.masterID],
        (result) => {
            sendResponse(response, result)
        })
})

app.delete('/playlist', (request, response) => {
    dao.query('DELETE FROM track WHERE playlist_id=$1 and uri=$2', [request.body.playlistId, request.body.uri], (result) => {
        sendResponse(response, result)
    })
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
