import React, { Component } from "react"
import './App.css';
import { Field, reduxForm } from 'redux-form';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
      };
  };
  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/employee/');
      const employees = await res.json();
      this.setState({
        employees
      });
    } catch (e) {
      console.log(e);
    }
  }
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.employees.filter(
      item => item.id
    );
    return newItems.map(item => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span 
          title={item.id}
          >
            {item.first_name} {item.last_name}
          <hr></hr>
          </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">

      <div className='ui container'>
        <div className='ui segment'>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form'
          >
            <Field
              name='username'
              type='text'
              component={this.renderField}
              label='Username'
            />
            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
            />
            <Field
              name='non_field_errors'
              type='hidden'
              component={this.hiddenField}
            />
            <button className='ui primary button'>Login</button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </div>
      </div>
    </main>
    )
  }
}

export default App;
