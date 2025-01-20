const ToggleGroup = ({ options, selected, onChange, className }) => {
    return (
        <div className={'flex gap-4 ' + className}>
            {Object.keys(options).map(option => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`${
                        selected.indexOf(option) != -1 ? 'bg-orange-900 border-orange-500' : 'dark:bg-gray-700 dark:border-gray-600'
                    } px-4 py-3 border rounded hover:bg-orange-800 hover:border-orange-400 font-medium transition border-gray-300`}
                >
                    {options[option]}
                </button>
            ))}
        </div>
    );
};

export default ToggleGroup;
