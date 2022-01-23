var amqp = require('amqplib/callback_api');

amqp.connect('amqps://atyftcdh:nOhw26J5K87e9zbcgwFeF2rObEQU8IPn@dingo.rmq.cloudamqp.com/atyftcdh', function(error, connection) {
    connection.createChannel(function(error, channel) {
        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });

        /* 
        queue가 두개의 client에 메세지를 준다고 가정할때, 
        한개의 client 가 과부하가 걸리거나 작업이 아직 안끝난 경우, 
        다른 client로 메세지를 보내야 한다. 
        이를 위해 아래와 같은 코드를 설정한다.
        acknowledged 가 아직 안끝난 client는 메세지를 더 받지 않도록 하는 코드임.
        */
        channel.prefetch(1); 

        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
        channel.consume(queue, function(msg){
            var secs = msg.content.toString().split('.').length - 1;
            console.log('debug2', secs);
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function(){
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        },{
            // 위에 channel.ack(msg) 라고 이미 acknowledged를 선언했기 때문에 false값을 줌
            noAck: false
        });
    });
});