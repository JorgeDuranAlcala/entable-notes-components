export const downloadAsJSON = (data:any, filename: string) => {
    if (!data) {
      console.error('No Data')
      return
    }
    if (!filename) filename = 'download.json'
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4)
    }
    const blob = new Blob([data], { type: 'text/json'})
    const mouseEvent = document.createEvent('MouseEvents')
    const downloadEl = document.createElement('a')
  
    downloadEl.download = filename
    downloadEl.href = window.URL.createObjectURL(blob)
    downloadEl.dataset.downloadurl = [
      'text/json',
      downloadEl.download,
      downloadEl.href
    ].join(':')
    mouseEvent.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null)
    downloadEl.dispatchEvent(mouseEvent)
  }
  