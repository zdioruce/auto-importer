import DownArrowIcon from "@assets/DownArrowIcon"
import UpArrowIcon from "@assets/UpArrowIcon"

export default function InputNumber(props) {

  const { 
    value, 
    disabled, 
    handleChange, 
    handleUp, 
    handleDown 
  } = props

  return (
    <div className={disabled?"ant-input-number ant-input-number-lg ant-input-number-disabled": "ant-input-number ant-input-number-lg"}>
      <div className="ant-input-number-handler-wrap">
        <span 
          unselectable="unselectable" 
          role="button" 
          aria-label="Increase Value" 
          aria-disabled="false" 
          className="ant-input-number-handler ant-input-number-handler-up"
          onClick={handleUp}
        >
          <i aria-label="icon: up" className="anticon anticon-up ant-input-number-handler-up-inner">
            <UpArrowIcon/>
          </i>
        </span>
        <span 
          unselectable="unselectable" 
          role="button" 
          aria-label="Decrease Value" 
          aria-disabled="false" 
          className="ant-input-number-handler ant-input-number-handler-down"
          onClick={handleDown}
        >
          <i aria-label="icon: down" className="anticon anticon-down ant-input-number-handler-down-inner">
            <DownArrowIcon/>
          </i>
        </span>
      </div>
      <div className="ant-input-number-input-wrap">
        <input 
          role="spinbutton" 
          className="ant-input-number-input" 
          autoComplete="off"           
          maxLength="6"           
          value={value}
          onChange={handleChange}          
        />
      </div>
    </div>
  )
}