export default function LargeLinkButton(props) {
    const { title, onClick } = props

    return (
        <button 
            type="button" 
            className="ant-btn ant-btn-link ant-btn-lg" 
            onClick={onClick}
        >
            <span>{title}</span>
        </button>
    )
}
