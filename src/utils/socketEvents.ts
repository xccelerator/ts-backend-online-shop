import { Server } from "socket.io"

export class Socket{
    io : Server
    constructor(socket : Server){
        this.io = socket
    }

    socketEvents(){
        // check online/offline
        this.io.on("connection", (socket) =>{
            console.log("User connected!")

            socket.on("disconnect", () => {
                console.log("User disconnected!")
            })
        })

    }
}