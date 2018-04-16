// It's just a Proof of Concept

const express = require('express')
const EventEmitter = require('events');

const app = express();

app.get('/', (req, res) => {
  res.setHeader('X-lambda-express', 'test');
  res.send('lambda express')
  res.end();
})

class ResExpressLambda extends EventEmitter {
  constructor() {
    super();
    this.connection = {
      destroyed: false,
      _httpMessage: this,
      writable: true,
      cork: function() { },
      uncork: function() { },
    };
    this.connection.write = (data, encoding, cbs) => {
      console.log(this.output.concat(data.toString()).join(''));
      this.output = [];
      // cbs && cbs(this);
    }
    this.socket = {};
    this._hasBody = true;
    this._headers = {};
    this._headerNames = {};
    this._removedHeader = {};
    this.output = [];
    this.outputEncodings = [];
    this.outputCallbacks = [];
    this.outputSize = 0;
    this._flushOutput = (conn) => { 
      // console.log(this)
    }
    this._onPendingData = (len) => { 
     // console.log('_onPendingData', this)
    }
  }
  setHeader(a, b) {
    this._headers[a] = b;
  }
}
class ReqExpressLambda {
  constructor() {
    this.socket = { 
      destroy: function() {}
    }
    this.baseUrl = "";
    this.url = "http://dampf/";
    this.complete = false;
    this.domain = null;
    this.headers = {};
    this.method = 'GET';
    this.originalUrl = '/';
    this.path = '/';
    this.query = {};
    this.options = "http://dampf/";
  }
}

class ExpressLambda {

  createServer(app) {
    this.app = app;   
    return this;
  }

  emitAwsLambda() {
    this.app(new ReqExpressLambda(), new ResExpressLambda());
  }

}

const ela = new ExpressLambda();
ela.createServer(app).emitAwsLambda();
