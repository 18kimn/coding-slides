import './ui/styles/style.css'
import deck from './ui/src/deck'
import useR from './ui/src/r-block.js'
import verify from './ui/src/creds'

const main = async () => {
  await deck.initialize({center: false})
  const isVerified = await verify
  useR(isVerified)
}

main()
