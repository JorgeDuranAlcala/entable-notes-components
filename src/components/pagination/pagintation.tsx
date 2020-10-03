import React, { useState } from 'react'
import { getRange, getPageInfo } from 'paging-algorithm'

export type HandlePageChange = (page: number, e?: any) => void

interface PaginationProps {
  total: number
  className: string
  limit: number
  pageCount: number
  currentPage: number
  pageValue: number
  onPageChange: HandlePageChange
}

interface PaginationItemProps {
  pages: number[]
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  previousPage: number
  nextPage: number
  totalPages: number
  pageValue: number
  onPageChange: HandlePageChange
}

const defaultProps: PaginationProps = {
  total: 10,
  className: '',
  limit: 10,
  pageCount: 5,
  currentPage: 0,
  pageValue: 0,
  onPageChange: (page: number) => console.log(page),
}

function Pagination(props: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { onPageChange } = props
  if (props.currentPage && currentPage !== props.currentPage) {
    setCurrentPage(props.currentPage)
  }

  const _getPageItemProps = (props: PaginationItemProps) => {
    const { pageValue, onPageChange: handlePageChange, ...rest } = props

    const onPageChange = (e: any) => {
      if (typeof handlePageChange === 'function') {
        handlePageChange(pageValue, e)
      }
      setCurrentPage(pageValue)
    }

    return {
      onClick: onPageChange,
      ...rest,
    }
  }

  const { total, limit, pageCount, className } = props

  const pageInfo = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage,
  })

  const { firstPage, lastPage, hasNextPage, hasPreviousPage, previousPage, nextPage, totalPages } = pageInfo

  const pages = total > 0 ? getRange(firstPage, lastPage) : []

  return (
    <div className={className}>
      <div>
        <button
          {..._getPageItemProps({
            pages,
            currentPage,
            hasNextPage,
            hasPreviousPage,
            previousPage,
            nextPage,
            totalPages,
            pageValue: 1,
            onPageChange,
          })}
        >
          first
        </button>
      </div>
    </div>
  )
}
Pagination.defaultProps = defaultProps

export default Pagination
