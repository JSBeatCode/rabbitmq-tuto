var amqp = require('amqplib/callback_api');

// amqp 서버에 connect
amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh', 
function(error0, connection){
    if(error0){
        throw error0
    }

    // 데이터를 주고받을 채널을 만듬.
    connection.createChannel(function(error1, channel){
        if(error1){
            throw error1;
        }

        var queue = 'hello';

        //만들어진 queue(Database)에 연결함
        channel.assertQueue(queue, {
            durable: false // 서버가 종료되어도 도중에 메세지를 잃지 않기 위함임. true면 데이터 유실방지, false면 신경 안씀.
        });

        console.log(" [*] Waiting for message in %s. To exit press CTRL_C", queue);

        // 데이터를 실제로 꺼내는 행위
        channel.consume(queue, function(msg){
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true // consume으로 데이터를 꺼냈다면, rabbitmq상의 큐(database)에 저장된 데이터를 true면 삭제, false면 그대로 유지
        })
    })
})