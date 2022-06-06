var amqp = require('amqplib/callback_api');

// amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh', 
amqp.connect('amqp://localhost:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = 'direct_logs';
        // var args = ['info','error','warning']
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'Hello World!';
        
        // 라우팅키, 라우팅 키에 따라 어디 queue에 쌓을지 분기처리 할 수 있다.
        var severity = (args.length > 0) ? args[0] : 'info';
        
        channel.assertExchange(exchange, 'direct', {
            durable: false
        });
        console.log('debug1', severity);
        channel.publish(exchange, severity, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});