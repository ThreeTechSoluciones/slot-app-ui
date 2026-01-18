
const DEFAULT_VIEW = {
    slotWidth: '272px',
    studentWidth: '208px',
    paddingLeft: '8px',
    marginInfoLeft: '24px',
    marginStudentLeft: '24px',
    overflowX: 'auto',
    padding: '2px 6px 2px 6px',
};

export const CALENDAR_VIEW = {
    4: {
        slotWidth: '272px',
        studentWidth: '208px',
        paddingLeft: '8px',
        marginInfoLeft: '24px',
        marginStudentLeft: '24px',
        overflowX: 'auto',
        padding: '2px 6px 2px 6px',

    },
    5: {
        slotWidth: '240px',
        studentWidth: '208px',
        paddingLeft: '8px',
        marginInfoLeft: '16px',
        marginStudentLeft: '8px',
        overflowX: 'auto',
        padding: '2px 6px 2px 6px',
    },
    6: {
        slotWidth: '216px',
        studentWidth: '180px',
        paddingLeft: '8px',
        marginInfoLeft: '16px',
        marginStudentLeft: '8px',
        overflowX: 'hidden',
        padding: '2px 4px 2px 4px',
    },
    7: {
        slotWidth: '182px',
        studentWidth: '152px',
        paddingLeft: '8px',
        marginInfoLeft: '16px',
        marginStudentLeft: '8px',
        overflowX: 'hidden',
        padding: '2px 4px 2px 4px',
    }
} as const;

export const getLayoutConfig = (columns: number) => {
    return CALENDAR_VIEW[columns as keyof typeof CALENDAR_VIEW] || DEFAULT_VIEW;
};