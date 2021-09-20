import React from 'react'

class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { label, type } = this.props;
    return (
        <div className='form__group'>
            <label className='form__label'>{label}</label>
            <input type={type} onChange={this.onChange} className='form__input' />
            {this.props.error && <p className='form__error'>{this.props.error}</p>}
        </div>
    );
  };
}

export default FileInput