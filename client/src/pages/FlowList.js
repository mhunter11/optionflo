import React from 'react'
import cx from 'classnames'

import styles from './Flow.module.css'

export default function FlowList(props) {
  const {
    ticker,
    strike_price,
    date_expiration,
    put_call,
    option_activity_type,
    description,
    sentiment,
    cost_basis,
    onClick,
    updated,
  } = props

  const OPTION_COST = parseInt(cost_basis).toLocaleString('en')
  const REF = description.split('Ref')[1]
  const OI = description.split('vs')[1].split(';')[0]
  const CONTRACT_AND_PRICE = description.split(':')[2].split('vs')[0]

  function formatTime(time) {
    const date = new Date(time * 1000)
    const hours = date.getHours()
    const minutes = '0' + date.getMinutes()
    const seconds = '0' + date.getSeconds()
    const formattedTime =
      hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    
    return formattedTime
  }

  function formatSentiment(data) {
    if (data == 'null') {
      return 'MIDPOINT'
    }

    return data
  }

  return (
    <div className={styles.flow_list}>
      <div className={styles.time}>{formatTime(updated)}</div>
      <div className={styles.ticker} onClick={onClick}>
        {ticker}
      </div>
      <div className={styles.date_expiration}>{date_expiration}</div>
      <div className={styles.strike_price}>{strike_price}</div>
      <div
        className={cx(styles.put_call, {
          [styles.call_green]: put_call === 'CALL',
          [styles.put_red]: put_call === 'PUT',
        })}
      >
        {put_call}
      </div>
      <div className={styles.option_activity_type}>
        {option_activity_type === 'SWEEP' ? 'SWEEP' : 'BLOCK'}
      </div>
      <div className={styles.description}>{CONTRACT_AND_PRICE}</div>
      <div className={styles.sentiment}>{formatSentiment(sentiment)}</div>
      <div className={styles.cost_basis}>${OPTION_COST}</div>
      <div className={styles.OI}>{OI}</div>
      <div>Ref {REF}</div>
    </div>
  )
}
