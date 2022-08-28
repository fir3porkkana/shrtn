import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { nanoid } from 'nanoid'
import { Link } from './models/link'

export const expressApp = express()

expressApp.use(cors())
expressApp.use(bodyParser.json())

expressApp.get('/hello', (req, res) => {
  const greetings = [
    'hello',
    'hi',
    "top of the morning to ya'",
    "how you goin'",
    'greetings',
    "g'day mate",
    'howdy partner',
  ]
  console.log('hi, server')
  res.send(greetings[Math.floor(Math.random() * greetings.length + 0.9)])
})

expressApp.get('/:shortId', async (req, res) => {
  try {
    const queriedLink = await Link.findOne({ shortId: req.params.shortId }).exec()

    if (!queriedLink) {
      return res.status(404).json({ error: 'no such link' })
    }

    queriedLink.clickCount = Number(queriedLink.clickCount) + 1

    const clickedLink = await queriedLink.save()
    console.log(`succesfully incremented ${queriedLink.shortId} click count, redirecting`)
    res.redirect(clickedLink.originalLink as string)
  } catch (error) {
    console.log(`error getting original link: ${error}`)
    res.status(500)
  }
})

expressApp.get('/stats/:shortId', async (req, res) => {
  try {
    const queriedLink = await Link.findOne({ shortId: req.params.shortId }).exec()

    if (!queriedLink) {
      return res.status(404).json({ error: 'no such link' })
    }

    console.log(`succesfully retrieved ${queriedLink.shortId}`)
    res.status(200)
    res.json(queriedLink)
  } catch (error) {
    console.log(`error getting original link: ${error}`)
    res.status(500)
  }
})

expressApp.post('/links', async (req, res) => {
  try {
    const { body } = req

    if (!body) {
      return res.status(400).json({ error: 'content missing' })
    }

    const link = new Link({
      shortId: nanoid(15),
      originalLink: body.originalLink,
      clickCount: 0,
    })

    const savedLink = await link.save()
    console.log(`succesfully saved link ${link.shortId}`)
    res.json(savedLink)
    res.status(200)
  } catch (error) {
    console.log(`error saving link: ${error}`)
    res.status(500)
  }
  res.send()
})
