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
        <div>
            <label>{label}</label>
            <input type={type} onChange={this.onChange} />
        </div>
    );
  };
}

export default FileInput