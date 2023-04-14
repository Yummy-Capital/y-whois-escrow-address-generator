import { getEscrowAddress } from './utils/address'

// the bech32 prefix for account address
const preffix = process.argv[2] || 'cro'
const size = parseInt(process.argv[3], 10) || 200
const label = process.argv[4] || 'IBC Escrow'

const addresses = Object.fromEntries(
  [...new Array(size).keys()].map((x) => [
    getEscrowAddress(preffix, 'transfer', `channel-${x}`),
    {
      label
    },
  ])
)

console.log(JSON.stringify(addresses, null, 2))
