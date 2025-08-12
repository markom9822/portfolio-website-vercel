import { useRef, useState, type ChangeEvent } from "react";


type TagInputProps = {
    tagOptions: string[],
    value: string[],
    onValueChanged: (value: string[]) => void,
    tagLimit?: number,
}

export const TagsInput = ({ tagOptions, value, onValueChanged, tagLimit }: TagInputProps) => {

    const [input, setInput] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredSuggestions = tagOptions
        .filter(
            (tag) =>
                tag.toLowerCase().includes(input.toLowerCase()) &&
                !value.includes(tag)
        )
        .slice(0, 5);

    const removeTag = (idx: number) => onValueChanged(value.filter((_, i) => i !== idx));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        if(tagLimit && value.length >= tagLimit)
        {
            return;
        }

        setInput(e.target.value);
        setShowSuggestions(e.target.value.length > 0 && filteredSuggestions.length > 0);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onValueChanged([...value, suggestion]);
        setInput('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    return (
        <div className="p-2 border-2 rounded-lg font-text bg-emerald-100 text-zinc-800">
            <div className="flex flex-wrap space-x-2">
                {value.map((tag, idx) => (
                    <div key={tag} className="bg-emerald-200 flex items-center px-2 py-1 rounded-2xl text-sm my-1">
                        <span>{tag}</span>
                        <span
                            style={{ cursor: 'pointer', marginLeft: 8 }}
                            onClick={() => removeTag(idx)}
                        >
                            &times;
                        </span>
                    </div>
                ))}
                <input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Add tech used"
                    className="flex text-sm font-text text-zinc-800 placeholder:text-zinc-700"
                    style={{ flex: 1, border: 'none', outline: 'none', minWidth: 100 }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    onFocus={() => setShowSuggestions(input.length > 0 && filteredSuggestions.length > 0)}
                />
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul 
                className="bg-emerald-300 z-1000 mt-2 mb-2"
                style={{
                    position: 'absolute',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    listStyle: 'none',
                    width: 220
                }}>
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            style={{ padding: 8, cursor: 'pointer' }}
                            className="bg-emerald-300 hover:bg-emerald-400 transition"
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}