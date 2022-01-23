var amqp = require('amqplib/callback_api');

amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var exchange = 'logs';
        var msg = process.argv.slice(2).join(' ') || 'Hello World!';
        // queue에 바로 넣는 대신 exchange에 넣기
        // exchange 타입은 fanout: 수신한 모든 메시지를 알고 있는 모든 대기열로 브로드캐스트합니다.
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        // exchange에 넣을 경우 publish
        // 가운데의 '' 은 routing key
        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});