import React, { memo } from 'react';
import { usePagination, DOTS } from 'hooks/usePagination';

interface Props {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className?: string;
}

const Pagination = (props: Props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;


    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className={`pagination-container ${[className]}: ${className}`}
            key='paginationContainer'
        >
            {/* Left navigation arrow */}
            <li
                className={currentPage === 1 ? "pagination-item disabled" : "pagination-item"}
                onClick={onPrevious}
                key="leftNavArrow"
            >
                <div className="arrow left" />
            </li>
            {paginationRange.map((pageNumber, index) => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li key={index} className="pagination-item dots">&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li
                        className={pageNumber === currentPage ? 'pagination-item selected' : 'pagination-item'}
                        onClick={() => onPageChange(+pageNumber)}
                        key={index}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={currentPage === lastPage ? 'pagination-item disabled' : 'pagination-item'}
                onClick={onNext}
                key="rightNavArrow"
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
};

export default memo(Pagination);