var amqp = require('amqplib/callback_api');

// amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh', 
amqp.connect('amqp://localhost:5672', function(error0, connection){
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'logs';
        // exchange에 접근
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue('', {
            // true: connection이 종료될 경우 queue도 사라지게 함
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            // queue와 exchange 간의 bind 연결을 해주는 코드
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, function(msg) {
                if (msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                }
            }, {
                noAck: true
            });
        });
    });
});