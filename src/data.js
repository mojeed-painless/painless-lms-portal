import { FaDoorOpen, FaCode, FaPaintbrush  } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";

export const topics = [
    {
        id: 1,
        icon: FaDoorOpen,
        section: "INTRODUCTION",
        description: "Learn the basics of web structure",
        subjects: [
            {name: 'General Overview', path: '/general-overview'},
            {name: 'Why should I learn Coding', path: '/why'},
            {name: 'Course Overview', path: '/course-overview'},
            {name: 'Code Editors', path: '/editor'}
        ]
    },
    {
        id: 2,
        icon: FaCode,
        section: "HTML",
        description: "Learn the basics of web structure",
        subjects: [
            {name: 'HTML Page Structure', path: '/html-structure'},
            {name: 'Lists', path: '/html-list'},
            {name: 'Tables', path: '/html-table'},
            {name: 'Images', path: '/html-image'},
            {name: 'Hyperlinks', path: '/html-hyperlinks'},
            {name: 'Inline & Block Elements', path: '/html-block-element'},
            {name: 'Forms, Types & Fields', path: '/html-form'},
            {name: 'HTML Styling', path: '/html-style'}
        ]
    },
    {
        id: 3,
        icon: FaPaintbrush,
        section: "CSS",
        description: "Learn the basics of web structure",
        subjects: [
            {name: 'Introduction to CSS', path: '/css_introduction'},
            {name: 'Inserting CSS', path: '/css_insert'},
            {name: 'CSS Syntax', path: '/css_syntax'},
            {name: 'Selectors', path: '/css_selectors'},
            {name: 'Colors', path: '/csS_color'},
            {name: 'Background', path: '/css_background'},
            {name: 'Borders', path: '/css_border'},
            {name: 'Box Model', path: '/css_boxmodel'},
            {name: 'Height & Width', path: '/css_width'},
            {name: 'Text Formatting', path: '/css_formatting'},
            {name: 'Links', path: '/css_links'},
            {name: 'Lists', path: '/css_lists'},
            {name: 'Tables', path: '/css_table'},
            {name: 'Icons', path: '/css_icon'},
            {name: 'Layout: Display', path: '/css_display'},
            {name: 'Layout: Overflow', path: '/css_overflow'},
            {name: 'Layout: Position', path: '/css_position'},
            {name: 'Layout: Flex Box', path: '/css_flexbox'},
            {name: 'Layout: Grid', path: '/css_grid'},
            {name: 'Combinators', path: '/css_conbinator'},
            {name: 'Pseudo-classes', path: '/css_pseudoclass'},
            {name: 'Pseudo-elements', path: '/css_pseudoelement'},
            {name: 'Attributes Selector', path: '/css_attribute'},
            {name: 'Box Shadow', path: '/css_boxshadow'},
            {name: 'Opacity', path: '/css_opacity'},
            {name: 'Transform', path: '/css_transform'},
            {name: 'Transition', path: '/css_transition'},
            {name: 'Animations', path: '/css_animation'},
            {name: 'Media Query', path: '/css_mediaquery'},
            {name: 'Styling Forms', path: '/css_form'},
            {name: 'Navigation Bar', path: '/css_navbar'},
            {name: 'Portfolio Project', path: '/css_portfolio'}
        ]
    },
    {
        id: 4,
        icon: LuBrainCircuit,
        section: "Javascript",
        description: "Make your websites interactive and dynamic.",
        subjects: [
            {name: 'General Overview', path: '/general-overview'},
            {name: 'Why should I learn Coding', path: '/why'},
            {name: 'Course Overview', path: '/course-overview'},
            {name: 'Code Editors', path: '/editor'}
        ]
    },
]