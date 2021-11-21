export const showStorageFullEmpire = () => {
  const storages = document.querySelector('#empire-container > div.planetViewContainer > div:nth-child(4)')
  const production = document.querySelector('#empire-container > div.planetViewContainer > div:nth-child(3)')
  const resources = document.querySelector('#empire-container > div.planetViewContainer > div:nth-child(2)')

  if (!window.location.pathname.includes('empire')) {
    return
  }

  if (storages.children.item(2).querySelector('.cell-empty-value').innerText) {
    return
  }

  for (let i = 2; i < storages.children.length; i++) {
    const hoursTillFull = []
    for (let j = 0; j<=2; j++) {
      hoursTillFull[j] = (
        (
          Number(storages.children.item(i).innerText.split('\n')[j].replace(/\./g, ''))
          -
          Number(resources.children.item(i).innerText.split('\n')[j].replace(/\./g, ''))
        )
        /
        Number(production.children.item(i).innerText.split('\n')[j].replace(/\./g, ''))
      ).toFixed(1);

      let maxHours
      if (new Date().getHours() > 22 || new Date().getHours() < 8) {
        maxHours = 8
      } else {
        maxHours = 3
      }
      if (hoursTillFull[j] < maxHours) {
        storages.children.item(i).querySelector('.cell-empty-value').style.background = 'grey'
      }

      if (hoursTillFull[j] < 1) {
        storages.children.item(i).querySelector('.cell-empty-value').style.background = 'red'
        setTimeout(() => new Notification('Sube la ** mina!'), hoursTillFull[j] * 60 * 60 * 1000)
      }

    }
    storages.children.item(i).querySelector('.cell-empty-value').innerText = `Full in: ${hoursTillFull.join(' | ')} hours`
  }

};