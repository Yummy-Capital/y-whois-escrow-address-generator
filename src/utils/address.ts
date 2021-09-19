import { bech32 } from 'bech32'
import { Buffer } from 'buffer'
import createHash from 'create-hash'

// the Bech32 prefix for account address
const PREFFIX = 'cro'

// Version defines the current version the IBC tranfer
const VERSION = 'ics20-1'

const encode = (prefix: string, data: Uint8Array) => {
  return bech32.encode(prefix, bech32.toWords(data))
}

const getAddressHash = (portID: string, channelID: string) => {
  // a slash is used to create domain separation between port and channel identifiers to
  // prevent address collisions between escrow addresses created for different channels
  const contents = `${portID}/${channelID}`

  // ADR 028 AddressHash construction
  const x = new Uint8Array(Buffer.from(VERSION))
  const y = new Uint8Array(1)
  const z = new Uint8Array(Buffer.from(contents))
  const buffer = new Uint8Array(x.length + y.length + z.length)
  buffer.set(x, 0)
  buffer.set(y, x.length)
  buffer.set(z, x.length + y.length)
  const hash = createHash('sha256').update(buffer).digest()
  return hash.slice(0, 20)
}

export const getEscrowAddress = (portID: string, channelID: string) => {
  const hash = getAddressHash(portID, channelID)
  return encode(PREFFIX, new Uint8Array(hash))
}
