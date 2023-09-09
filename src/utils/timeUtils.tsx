import moment from 'moment'

export const renderTimestamp = (time: number) => {
  const diff = moment().diff(moment(time), 'month')
  if (diff > 12) return <i title={moment(time).format('LLLL')}>{moment(time).format('lll')}</i>

  return <i title={moment(time).format('LLLL')}>{moment(time).fromNow()}</i>
}
