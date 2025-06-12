import { useState } from 'react';
import './styles.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<Number>();

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className='accordion'>
            {items.map((item, index) => (
                <div key={index} className="accordion-item">
                    <div
                        className="accordion-title"
                        onClick={() => handleToggle(index)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <span>
                            {item.title}
                        </span>
                        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                            {openIndex === index ? <FaChevronDown /> : <FaChevronUp />}
                        </span>
                    </div>
                    {openIndex === index && (
                        <div className="accordion-content"><p>{item.content}</p></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Accordion;
