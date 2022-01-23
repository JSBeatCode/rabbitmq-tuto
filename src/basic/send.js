var amqp = require('amqplib/callback_api');

// amqp 서버에 connect
amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh',
function(error0, connection) {
    if(error0){
        throw error0
    }

    // 데이터를 주고받을 채널을 만듬.
    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1;
        }

        var queue = 'hello';
        var msg = 'Hello World!';

        //만들어진 queue(Database)에 연결함
        channel.assertQueue(queue, {
            durable: false // 서버가 종료되어도 도중에 메세지를 잃지 않기 위함임. true면 데이터 유실방지, false면 신경 안씀.
        });

        // 데이터를 rabbitmq의 큐(DB)에 보내는 행위
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [X] Sent %s", msg);

    });
    // 실제 작업은 시간이 걸리고, 실제 작업 하는 것처럼 꾸미기 위해 setTimeout설정 
    setTimeout(function(){
        // rabbitmq 작업 후에는 연결을 종료를 해준다.
        connection.close();
        process.exit(0)
    }, 500);
});

// export default sendExec;