import http from 'http'
import express from 'express'
import RED from 'node-red'


const app = express()
const PORT = process.env.PORT || 3000

app.use("/public", express.static("public"))
app.use("/home", express.static("home"))

const server = http.createServer(app)

var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/",
    userDir:"/app/thiendev/.nodered",
    functionGlobalContext: { },    // enables global context
    adminAuth: {
        type: "credentials",
        users: [
            {
                username: 'admin',
                password: '$2a$08$akGA2pL8tG/npx/a.qLaX.1y3K6nrtr4TRdBfP7GTQFCSqScG5faC',
                permissions: "*"
            }
        ]
    }
}

RED.init(server, settings)

app.use(settings.httpAdminRoot, RED.httpAdmin)

app.use(settings.httpNodeRoot, RED.httpNode)

server.listen(PORT, '0.0.0.0')

RED.start()
