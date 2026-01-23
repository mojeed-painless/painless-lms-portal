import { FiHome } from "react-icons/fi";
import { MdOutlineMenuBook, MdOutlineAssignment } from "react-icons/md";
import { LuSparkles } from "react-icons/lu";
import { IoPodiumOutline, IoSettingsOutline } from "react-icons/io5";
import { CgTranscript } from "react-icons/cg";

import { FaDoorOpen, FaCode, FaPaintbrush  } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import {
    Award,
    BadgeCheck,
    NotepadText,
    Sparkles,
    Atom,
    PenTool,
    CodeXml,
    UsersRound,
    UserRoundCheck,
    History,
    BookOpenText,
    Trophy,
    FileBadge,
} from 'lucide-react';

// SIDEBAR DATA
export const listTexts = [
  { id: 1, text: 'Home', icon: FiHome, to: '/' },
  { id: 2, text: 'Course Contents', icon: MdOutlineMenuBook, to: '/welcome' },
  { id: 3, text: 'Assignments', icon: MdOutlineAssignment, to: '/assignments' },
  { id: 4, text: 'Quizzes', icon: LuSparkles, to: '/quizzes' },
  { id: 5, text: 'Grades', icon: IoPodiumOutline, to: '/grades' },
  { id: 6, text: 'Transcript', icon: CgTranscript, to: '/transcript' },
  { id: 7, text: 'Settings', icon: IoSettingsOutline, to: '/settings' },
]

export const homeFeatures = [
    {
        Icon: CodeXml,
        title: 'Interactive Learning',
        description: 'Practice with real-world scenarios and get instant feedback.',
    },
    {
        Icon: Trophy,
        title: 'Gamified Progress',
        description: 'Compete with others to earn points, badges, and climb the leaderboard.',
    },
    {
        Icon: FileBadge,
        title: 'Certification',
        description: 'Earn certificate as a proof of participation and competent',
    },
]

export const homeStats = [
    {
        figure: '100+',
        label: 'Certified Learners',
    },
    {
        figure: '70+',
        label: 'Learning Contents',
    },  
    {
        figure: '1M+',
        label: 'Quizzes Taken',
    },
    {
        figure: '4.9',
        label: 'Average Rating',
    },
]



export const homeTestimonials = [
    {
        name: 'Jane Doe',
        feedback: 'Painless Code Academy transformed my coding skills. The interactive projects and mentor feedback made learning enjoyable and effective!',
        rating: 5,
    },
    {
        name: 'John Smith',
        feedback: 'The flexible learning schedule allowed me to balance my studies with work. Highly recommend Painless Code Academy to anyone looking to master frontend development!',
        rating: 4.5,
    },
    {
        name: 'Emily Johnson',
        feedback: 'The gamified progress system kept me motivated throughout the course. Earning badges and climbing the leaderboard was a fun way to track my learning journey.',
        rating: 5,
    },
    {
        name: 'Michael Brown',
        feedback: 'Earning a certificate from Painless Code Academy boosted my confidence and helped me land my first frontend developer job. The course content was top-notch!',
        rating: 4.8,
    },
];


// WELCOME SCREEN DATA
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
        description: "Understand the building blocks of every webpage.",
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
        description: "Discover how to transform plain structures into visually appealing designs.",
        subjects: [
            {name: 'Introduction to CSS', path: '/css_introduction'},
            {name: 'Inserting CSS', path: '/css_insert'},
            {name: 'CSS Syntax', path: '/css_syntax'},
            {name: 'Selectors', path: '/css_selectors'},
            {name: 'Colors', path: '/css_color'},
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
            {name: 'JavaScript Introduction', path: '/js-intro'},
            {name: 'Linking Javascript', path: '/js-linking'},
            {name: 'Alert, Console & Comment', path: '/js-alert'},
            {name: 'Statements', path: '/js-satements'},
            {name: 'Variables', path: '/js-variables'},
            {name: 'Naming Variables', path: '/js-naming-variables'},
            {name: 'Constant', path: '/js-constant'},
            {name: 'Data Types', path: '/js-data-types'},
            // {name: 'STRINGS', path: ''},
            // {name: 'NUMBERS', path: ''},
            // {name: 'BIGINT', path: ''},
            // {name: 'BOOLEAN', path: ''},
            // {name: 'NULL, UNDEFINED', path: ''},
            // {name: 'TYPEOF', path: ''},
        ]
    },
]






// DASHBOARD STATS
export const statsData = [
    {
        title: 'Lessons Completed',
        figure: '0/74',
        description: '0% completed',
        Icon: BadgeCheck,
    },
    {
        title: 'Overall Grade',
        figure: '0%',
        description: 'Keep learning!',
        Icon: Award,
    },
    {
        title: 'Assignments Done',
        figure: '0',
        description: 'submit pending Assignment',
        Icon: NotepadText,
    },
    {
        title: 'Daily Quiz',
        figure: '0 pts',
        description: '+0 pts today',
        Icon: Sparkles,
    },
]




export const learningPath = [
    {
        Icon: CodeXml,
        stage: 'Beginner',
        title: 'HTML, CSS & Basic JavaScript',
        description: 'Master the foundational technologies of web development',
        module: '0/5 modules complete',
        link: '/welcome',
    },
    {
        Icon: PenTool,
        stage: 'Intermediate',
        title: 'Advanced JavaScript',
        description: 'Deep dive into modern JavaScript concepts',
        module: '0/4 modules complete',
        link: '',
    },
    {
        Icon: Atom,
        stage: 'Advanced',
        title: 'React Mastery',
        description: 'Build modern web applications with React',
        module: '0/8 modules complete',
        link: '',
    }
]





export const adminStats = [
    {
        title: 'Total Users',
        value: '1,234',
        Icon: UsersRound,
        color: 'blue',
    },
    {
        title: 'Pending Approval',
        value: '56',
        Icon: History,
        color: 'yellow',
    },
    {
        title: 'Approved Users',
        value: '890',
        Icon: UserRoundCheck,
        color: 'green',
    },
    {
        title: 'Course Enrollments',
        value: '12',
        Icon: BookOpenText,
        color: 'purple',
    }
]