let clients = []

export function streamNotifications(req, res) {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  })

  // send a comment to establish stream in some proxies
  res.write(':ok\n\n')
  clients.push(res)
  req.on('close', () => {
    clients = clients.filter(c => c !== res)
  })
}

export function pushNotification(notification) {
  // notification is an object, stringify
  const payload = JSON.stringify(notification)
  clients.forEach(res => {
    try {
      res.write(`data: ${payload}\n\n`)
    } catch (err) {
      // ignore closed sockets
    }
  })
}
