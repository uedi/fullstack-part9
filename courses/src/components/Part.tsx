import React from 'react';
import CoursePart from '../types';

const Part = ({ part }: { part: CoursePart }) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled course part: ${JSON.stringify(value)}`);
    };

    const partContent = () => {
        switch (part.type) {
            case 'normal':
                return (
                    <div style={{ fontStyle: 'italic' }}>{part.description}</div>
                )
            case 'groupProject':
                return (
                    <div>project exercises {part.groupProjectCount}</div>
                )
            case 'submission':
                return (
                    <div>
                        <div style={{ fontStyle: 'italic' }}>{part.description}</div>
                        <div>submit to {part.exerciseSubmissionLink}</div>
                    </div>
                )
            case 'special':
                return (
                    <div>
                        <div style={{ fontStyle: 'italic' }}>{part.description}</div>
                        <div>required skills: { part.requirements.map((item, index) => (
                            index < part.requirements.length - 1 ? item + ', ' : item
                        ))}</div>
                    </div>
                )
            default:
                return assertNever(part);
        }
    };

    return (
        <div>
            <div style={{ fontWeight: 'bold' }}>{part.name} {part.exerciseCount}</div>
            { partContent() }
        </div>
    )
};

export default Part;