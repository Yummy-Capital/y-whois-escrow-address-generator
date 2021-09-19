import { getEscrowAddress } from './utils/address'

const SIZE = parseInt(process.argv[2], 10) || 200
const LABEL = process.argv[3] || 'IBC Escrow'

const addresses = Object.fromEntries(
  [...new Array(SIZE).keys()].map((x) => [
    getEscrowAddress('transfer', `channel-${x}`),
    LABEL,
  ])
)

console.log(JSON.stringify(addresses, null, 2))
