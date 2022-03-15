import styles from './CheckBox.module.scss'

export default function CheckBox(props) {

  const { title, check, indeterminate, handleCheck, className, style } = props

  return (
    <label 
      className={check? "ant-checkbox-wrapper ant-checkbox-wrapper-checked" + className: "ant-checkbox-wrapper " + className}
      style={style}
    >
      <span className={check? (indeterminate?"ant-checkbox ant-checkbox-indeterminate ant-checkbox-checked":"ant-checkbox ant-checkbox-checked") : "ant-checkbox"}>
        <input 
          type="checkbox" 
          className="ant-checkbox-input" 
          value="" 
          onChange={handleCheck}
        />
        <span className="ant-checkbox-inner"></span>
      </span>
      <span>{title}</span>
    </label>
  )
}