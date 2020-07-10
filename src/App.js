import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ethers} from 'ethers';

class MyForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.mnemonic = React.createRef();
    this.message = React.createRef();
    this.headers = React.createRef();
  }

  handleSubmit(event) {
    var mnemonic =  this.mnemonic.current.value;
    var message = this.message.current.value;
    this.encode(mnemonic, message);
  };

  async encode(mnemonic, message) {
    console.log(this.mnemonic.current.value);
    console.log(this.message.current.value);

    const wallet = ethers.Wallet.fromMnemonic(this.mnemonic.current.value);  
    const signedMessage = await wallet.signMessage(this.message.current.value);                    
    const address = await wallet.getAddress(); 

    var text = `x-auth-ethereum-address: ${address} 
  x-auth-message: ${message}   
  x-auth-signature: ${signedMessage}`;
    this.headers.current.innerText = text;   
  }

  render() {
    return (
       <div className='container'>
                   <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'/>
        <h2>Generate Auth Headers</h2>
        <div className="row">
          <div className="col">
            <em>Caution</em> only use a sample mnemonic here. Do not use
            your real mnemonic<br/>
            <pre>inflict stairs vast caution vacant female boring label mandate more cash heart pen school pattern</pre>
           <div>
              <label htmlFor="mnemonic">mnemonic</label>
              <input name="mnemonic" type="text" className="form-control" ref={this.mnemonic} />
            </div>
            <div>
              <label htmlFor="message">message</label> 
              <input name="message" type="text" className="form-control" ref={this.message} />
            </div>
            <br/>
            <div> 
               <p className="lead">
                  <a className="btn btn-primary btn-lg" href="#" role="button" onClick={this.handleSubmit}>Generate Headers</a>
                </p>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-auto">
              <div className="border" ref={this.headers} />
            </div>
        </div>
       
      </div>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
