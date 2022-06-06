var amqp = require('amqplib/callback_api');

// amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh', 
amqp.connect('amqp://localhost:5672', function(error0, connection){
    if(error0){
        throw error0;
    }

    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1;
        }

        var queue = 'task_queue';
        console.log('debug1', process.argv);
        var msg = process.argv.slice(2).join(' ') || "Hello World";

        channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true // 서버가 종료되어도 도중에 메세지를 잃지 않기 위함임. true면 데이터 유실방지, false면 신경 안씀.
        })
        console.log(' [x] Sent %s', msg);
    });
    setTimeout(() => {
        connection.close();
        process.exit(0)
    }, 500);
})