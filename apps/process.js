exports.run = () =>{
    process.on('SIGTERM', signal => {
        console.log(`Process ${process.pid} received a SIGTERM signal`)
        process.exit(0);
    })
    
    process.on('SIGINT', signal => {
        console.log(`Process ${process.pid} has been interrupted`)
        process.exit(0);
    })
};