import Kuzzle from 'kuzzle-sdk'

var kuzzle = new Kuzzle(KUZZLE_URL, {defaultIndex: DEFAULT_INDEX});
export default kuzzle;