import React from 'react'

const Total = ({ exerciseSum }: { exerciseSum: number }) => {
    return (
        <p>
            Number of exercises{" "}
            { exerciseSum }
        </p>
    )
};

export default Total;