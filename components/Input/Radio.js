export default function Radio(props) {

  const { title, currentValue, value, onChange } = props

  return (
    <label 
      className="ant-radio-wrapper" 
      style={{margin: '8px 0px', color: 'rgb(90, 88, 89)', fontSize: '13px'}}
    >
      <span className={currentValue == value? "ant-radio ant-radio-checked": "ant-radio"}>
          <input 
            type="radio" 
            className="ant-radio-input" 
            value="0" 
            onChange={onChange} 
            checked={currentValue == value}
          />
          <span className="ant-radio-inner"></span>
      </span>
      <span>{title}</span>
  </label>
  )
}