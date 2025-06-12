interface CompositionProps {
    name: string;
    onClick: () => void;
    children: React.ReactNode;
}
export const CustomButton = ({...props}:CompositionProps) => {
    return (
        <button name={props.name} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={props.onClick}>
        </button>
    );
}