import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'
import BackupIcon from '@material-ui/icons/Backup';
import styled from 'styled-components'

const Input = styled.input`
  max-width: 100%;
  margin-bottom: 8px;
`

const App = (props) => {
  const { name, init } = props
  const [value, setValue] = useState({})

  useEffect(() => {
    let v = init
    Object.keys(v).map(row => {
      if(props.value[row]) {
        v[row] = props.value[row]
      }
    })
    setValue(v)
  }, [init])

  const handleChange = event => {
    const val = event.target.value
    let n = event.target.name.split('_')
    if(n.length === 3) {
      let m = value
      m[n[1]][n[2]] = val
      setValue({...m})
    } else {
      setValue({...value, [n[1]]:val})
    }
  }

  return (
    <React.Fragment>
      <textarea
        name={name}
        style={{display:"none"}}
        value={JSON.stringify(value)}
        readOnly
      />
      {Object.keys(value).map((row, index) => (
        <div key={index} style={{marginBottom:5}}>
          <label className="label" htmlFor={`id_${name}_${row}`}>{row}:</label>
          {typeof(value[row]) === 'object' ? (
            <div style={{clear:'both'}}>
            {Object.keys(value[row]).map((r2,i2) => (
            <div key={i2} style={{marginBottom:5}}>
              <label className="label"
                htmlFor={`id_${name}_${row}_${r2}`}>{r2}:</label>
              <input
                className="vTextField"
                type="text"
                name={`${name}_${row}_${r2}`}
                value={value[row][r2]}
                maxLength="200"
                id={`id_${name}_${row}_${r2}`}
                onChange={handleChange}
              />
            </div>
            ))}
          </div>
          ) : (
          <input
            className="vTextField"
            type="text"
            name={`${name}_${row}`}
            value={value[row]}
            maxLength="200"
            id={`id_${name}_${row}`}
            onChange={handleChange}
          />

          )}
        </div>
      ))}
    </React.Fragment>
  )
}

App.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  init: PropTypes.object,
  value: PropTypes.object
}

ReactDOM.render(<App {...window.props}/>, document.getElementById(window.props.id));
