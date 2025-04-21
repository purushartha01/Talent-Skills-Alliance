import { useEffect, useRef, useState } from "react";

const SkillSuggestionInput = ({ value, onChange, onSelect, skillsList = [], disabled = false, placeholder = "Skill name (e.g. React, Python, UX Design)" }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestedSkills, setSuggestedSkills] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [debouncedValue, setDebouncedValue] = useState(value || "");

    const suggestionRef = useRef(null);
    const debounceTimeout = useRef(null);

    // Debounce input value
    useEffect(() => {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setDebouncedValue(value);
        }, 200);
        return () => clearTimeout(debounceTimeout.current);
    }, [value]);

    useEffect(() => { }, [value, skillsList, disabled, placeholder]);

    // Filter suggestions
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSuggestedSkills([]);
            setShowSuggestions(false);
            return;
        }

        const matched = skillsList.filter((skill) =>
            skill.toLowerCase().includes(debouncedValue.toLowerCase())
        );
        setSuggestedSkills(matched.length > 0 ? matched : ["No suggestions available"]);
        setShowSuggestions(true);
        setActiveIndex(-1);
    }, [debouncedValue, skillsList]);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestedSkills.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, suggestedSkills.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && suggestedSkills[activeIndex] !== "No suggestions available") {
                handleSelect(suggestedSkills[activeIndex]);
            }
        }
    };

    // Scroll suggestion into view
    useEffect(() => {
        const ul = suggestionRef.current;
        if (!ul || activeIndex < 0) return;

        const item = ul.children[activeIndex];
        if (item) {
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [activeIndex]);

    const handleSelect = (skill) => {
        if (skill === "No suggestions available") return;
        onSelect(skill);
        setShowSuggestions(false);
    };

    return (
        <div className="relative flex-1">
            <input
                type="text"
                className="flex-1 w-full border rounded-md px-3 py-2 outline-none"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />

            {showSuggestions && suggestedSkills.length > 0 && (
                <ul
                    ref={suggestionRef}
                    className="absolute z-10 w-full bg-white border rounded-md shadow-sm max-h-40 overflow-y-scroll"
                >
                    {suggestedSkills.map((skill, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(skill)}
                            className={`px-4 py-2 cursor-pointer capitalize ${index === activeIndex ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
                                }`}
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default SkillSuggestionInput;