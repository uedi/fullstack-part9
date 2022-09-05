import React from 'react';
import Part from './Part';
import CoursePart from '../types'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            { courseParts.map((item, index) => (
                <div key={index}>
                    <Part part={item} />
                    <div style={{ marginBottom: 10 }} />
                </div>
            ))}
        </div>
    )
};

export default Content;