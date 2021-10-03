window.onload = () => {
  const input = document.getElementById('tagId')

  input.onkeyup = (e) => {
    console.log(e.currentTarget.value)
    const name = e.currentTarget.value
    axios
      .get(`/api/search?name=${name}`)
      .then((res) => {
        const feed = document.querySelector('#feed')

        const list = res.data.uploads.flat().reduce((ac, tag) => {
          console.log(tag)
          return (
            ac +
            `<h4>${tag.tagId.name}</h4>
        <img class="resolve" src="${tag.img}" alt="imagen">
        <a href='/fotograma/detalles/${tag._id}' class="btn btn-outline-success"> details</a>
        <hr>`
          )
        }, '')

        feed.innerHTML = list
      })
      .catch((err) => console.log(err))
  }
}
