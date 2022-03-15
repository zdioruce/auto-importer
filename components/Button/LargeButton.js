export default function LargeButton(props) {
    const { title, onClick } = props

    return (
        <button 
            type="button" 
            className="ant-btn ant-btn-primary ant-btn-lg"            
            onClick={onClick}
        >
            <span>{title}</span>
        </button>
    )
}
