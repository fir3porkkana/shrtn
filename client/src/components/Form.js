import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { Button, Input } from "semantic-ui-react"


const Form = ({ baseUrl }) => {

  const [linkInput, setLinkInput] = useState(null)
  const [shortLink, setShortLink] = useState(null)

  const submit = async () => {
    if (linkInput) {
      const response = (await axios.post(`${baseUrl}/links`, { originalLink: linkInput })).data
      setShortLink(response.shortId)
    }
  }


  return (
    <div>
      <div className="horizontal-stack padded ">
        <Input className="flex-item" placeholder="https..." onChange={(event) => setLinkInput(event.target.value)} />
        <Button className="padded-row-item" onClick={submit}>
          shrtn!
        </Button>
      </div>
      {shortLink ? <Link to={`/stats/${shortLink}`} className="centered">stats!</Link>  : null}
    </div>
  )
}

export { Form }