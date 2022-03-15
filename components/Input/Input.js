export default function Input(props) {

  const { value, placeholder, onChange } = props

  return (
    <input 
      placeholder={placeholder}
      type="text"
      className="ant-input ant-input-lg" 
      value={value}
      onChange={onChange}
    />
  )
}