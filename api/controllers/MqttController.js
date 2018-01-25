/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const mqtt = require('mqtt');
const ipAddr = "http://54.199.244.180:1883";
module.exports = {
	sub(req,res) {
		const topic = req.param("topic");
		const settings = {
			keepalive: 10,
			protocolId: 'MQIsdp',
			protocolVersion: 3,
			clientId: 'web',
			clean:false,
			username: 'pawbo',
			password: '26963131'
		};
		const client = mqtt.connect(ipAddr,settings);
		client.on('connect', function (err) {
			console.log("err",err);
			client.subscribe(topic,{qos:1},function() {
			  console.log('subscribe ok.');
			  client.end();
				res.json('subscribe ok.');
			})
		})

		client.on('error', function (err) {
		  console.log('error',err.Error);
		  client.end()
			res.json(err.Error);
		})

		client.on('message', function (topic, message) {
		  // message is Buffer
		  console.log(message.toString())
		  client.end()
		})
	},
	pub(req,res) {
		const topic = req.param("topic");
		const msg = req.param("msg");
		console.log(topic,msg);
		const settings = {
			keepalive: 10,
			protocolId: 'MQIsdp',
			protocolVersion: 3,
			clientId: 'web',
			username: 'pawbo',
			password: '26963131'
		}
		const client = mqtt.connect(ipAddr,settings);
		client.on('connect', function (connack) {
			console.log("connack",connack);
			client.publish(topic, msg, {qos:2,retain: false},function(result) {
				console.log('result',result);
				client.end();
				res.json('publish ok.');
			})
		})

		client.on('error', function (err) {
			console.log('error',err);
			client.end();
			res.json(err);
		})
	}
};
