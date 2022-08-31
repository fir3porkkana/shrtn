import React, { useState, useEffect } from "react"
import { Statistic, Segment, Header, Dimmer, Loader } from 'semantic-ui-react'
import useAxios from 'axios-hooks'
import {
  useParams
} from "react-router-dom"

const Stats = ({ setError }) => {
  let { linkId } = useParams()
  const [{ data, loading, error }] = useAxios(`/api/linkstats/${linkId}`)
  const [linkData, setLinkData] = useState()

  useEffect(() => {
    if (data) {
      setLinkData(data)
    }
    if (error) {
      setError(error)
    }
  }, [loading, data, error, setError])

  if (loading || !linkData) {
    return (
      <Dimmer active>
        <Loader>Loading stats</Loader>
      </Dimmer>
    )
  }

  return (
    <div>
      <div className="horizontal-stack centered">
        <div>
          <Header as="a" href={linkData.shortUrl}>
            {linkData.shortUrl}
          </Header>
          <p>leading to <a href={linkData.originalLink}>{linkData.originalLink}</a>
          </p>
        </div>
        <Segment className="statistic" circular>
          <Statistic size="large">
            <Statistic.Value>{linkData.clickCount}</Statistic.Value>
            <Statistic.Label>{linkData.clickCount === 1 ? "click " : "clicks "} so far after shrtning</Statistic.Label>
          </Statistic>
        </Segment>
      </div>
    </div>

  )
}

export { Stats }