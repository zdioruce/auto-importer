export default function LinkButton(props) {
    const { title, onClick } = props

    return (
        <button 
            type="button" 
            className="ant-btn ant-btn-link" 
            onClick={onClick}
        >
            <span>{title}</span>
        </button>
    )
}
