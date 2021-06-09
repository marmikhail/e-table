import React from "react";
import { TextField}  from '@sberdevices/plasma-ui';

import "../App.css";


export class Find extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      note: '',
    }
  }

  render () {
    const { onAdd } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(this.state.note);
          this.setState({
            note: '',
          })
        }}
      >
        <TextField
          className   = "find"
          label = "Введите код добавки или ее название"
          value       = { this.state.note }
          onChange    = {({ target: { value } }) => this.setState({
            note: value,
          })}
          required
          autoFocus
        />
      </form>
    )
  }

}