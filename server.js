import http from 'node:http'
import path from 'node:path'
import fs from 'node:fs'

const PORT = 3000

// Manejar las possibles solicitudes
const requestHandler = (req, res) => {
  // Mapeo de las rutas de archivos
  let filePath = '.' + req.url
  if (filePath === './') {
    filePath = './index.html' // Esto sirve un archivo por defecto si no se especifica ninguno
  }

  // Extensiones MIME para diferentes tipos de archivo
  const extname = String(path.extname(filePath).toLowerCase())
  const mimeTypes = {
    '.html': 'text/html',
    //'.js': 'text/javascript',
    //'.css': 'text/css',
    //'.json': 'application/json',
    //'.png': 'image/png',
    //'.jpg': 'image/jpg',
    //'.gif': 'image/gif',
    //'.svg': 'image/svg+xml',
    //'.wav': 'audio/wav',
    //'.mp4': 'video/mp4',
    //'.woff': 'application/font-woff',
    //'.ttf': 'application/font-ttf',
    //'.eot': 'application/vnd.ms-fontobject',
    //'.otf': 'application/font-otf',
    //'.wasm': 'application/wasm'
  }

  const contentType = mimeTypes[extname] || 'application/octet-stream'

  // Lee el archivo solicitado
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Si no se encuentra el archivo deveuelve un archivo 404
        fs.readFile('./404.html', (err, notFoundContent) => {
          res.writeHead(404, { 'ContentType': 'text/html' })
          res.end(notFoundContent, 'utf-8')
        })
      } else {
        // Otro tipo de error
        res.writeHead(500)
        res.end(`Error: ${error.code}`)
      }
    } else {
      // Si se encuentra el archivo envialo al cliente
      res.writeHead(200, { 'ContentType': contentType })
      res.end(content, 'utf-8')
    }
  })
}

const server = http.createServer(requestHandler)

server.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`)
})
