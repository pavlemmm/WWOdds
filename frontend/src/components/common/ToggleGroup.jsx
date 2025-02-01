const ToggleGroup = ({ options, selected, onChange, className }) => {
    return (
        <div className={'flex gap-4 ' + className}>
            {Object.keys(options).map(option => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onChange(option)}
                    className={`${
                        selected.indexOf(option) != -1 ? 'bg-slate-500 border-slate-200' : 'dark:bg-gray-700 dark:border-gray-600'
                    } px-4 py-3 border rounded hover:bg-gray-500 dark:hover:bg-gray-500 hover:border-gray-400 dark:hover:border-gray-400 font-medium transition border-gray-400 text-white`}
                >
                    {options[option]}
                </button>
            ))}
        </div>
    );
};

export default ToggleGroup;
