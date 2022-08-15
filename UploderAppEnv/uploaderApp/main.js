require('dotenv').config()
console.log(process.env) 


 import { NFTStorage } from 'https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js'

  const token =
    new URLSearchParams(window.location.search).get('key') || process.env.API_KEY 
  function log(msg) {
    msg = JSON.stringify(msg, null, 2)
    document.getElementById('out').innerHTML += `${msg}\n`
  }

  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const fileEl = document.querySelector('input[type="file"]')
    if (!fileEl.files.length) return log('No files selected')
    log(`Storing ${fileEl.files.length} files...`)
    const store = new NFTStorage({ token })
    const cid = await store.storeDirectory(fileEl.files)
    log({ files: Array.from(fileEl.files).map((f) => f.name), cid })
    const status = await store.status(cid)
    log(status)
  })