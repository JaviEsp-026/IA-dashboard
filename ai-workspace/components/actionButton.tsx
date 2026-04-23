

type ActionButtonProps = {
    onClick: () => void;
    text: string;
    buttonClass: string;
}

export default function ActionButton({ onClick, text, buttonClass }: ActionButtonProps) {

    return (
        <button onClick={onClick} className={buttonClass}>
            {text}
        </button>
    )

}