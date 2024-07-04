function Button({ children, className, ...rest }) {
    return (
        <button
            {...rest}
            className={`${className} bg-green-400 hover:bg-green-500 text-black font-normal py-2 px-4 rounded`}
        >
            {children}
        </button>
    )
}

export default Button;