import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination'

export const PaginationSection = ({
	totalItems,
	ItemsPerPage,
}: {
	totalItems: number
	ItemsPerPage: number
}) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [currentPage, setCurrentPage] = useState<number>(
		Number(searchParams.get('page')) || 1,
	)

	useEffect(() => {
		if (
			!currentPage ||
			currentPage < 1 ||
			currentPage > Math.ceil(totalItems / ItemsPerPage)
		) {
			setSearchParams((state) => {
				state.set('page', '1')
				return state
			})
			return setCurrentPage(1)
		}

		setSearchParams((state) => {
			state.set('page', String(currentPage))
			return state
		})
	}, [ItemsPerPage, currentPage, searchParams, setSearchParams, totalItems])

	const pages = []
	for (let i = 1; i <= Math.ceil(totalItems / ItemsPerPage); i++) {
		pages.push(i)
	}

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handlePrevPage2 = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 2)
		}
	}

	const handleNextPage = () => {
		if (currentPage < pages.length) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handleNextPage2 = () => {
		if (currentPage + 1 < pages.length) {
			setCurrentPage(currentPage + 2)
		}
	}
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className='cursor-pointer select-none'
						onClick={() => {
							handlePrevPage()
						}}
					/>
				</PaginationItem>

				{currentPage + 2 > pages.length &&
					currentPage + 1 !== pages.length &&
					pages.length > 2 && (
						<PaginationItem>
							<PaginationLink
								onClick={handlePrevPage2}
								className='cursor-pointer select-none'
							>
								{currentPage - 2}
							</PaginationLink>
						</PaginationItem>
					)}
				{currentPage + 2 > pages.length &&
					pages.length > 1 &&
					currentPage > 1 && (
						<PaginationItem>
							<PaginationLink
								onClick={handlePrevPage}
								className='cursor-pointer select-none'
							>
								{currentPage - 1}
							</PaginationLink>
						</PaginationItem>
					)}

				<PaginationItem>
					<PaginationLink className='cursor-pointer select-none bg-black/15 dark:bg-white/15'>
						{currentPage}
					</PaginationLink>
				</PaginationItem>

				{currentPage < pages.length && (
					<PaginationItem>
						<PaginationLink
							onClick={handleNextPage}
							className='cursor-pointer select-none'
						>
							{currentPage + 1}
						</PaginationLink>
					</PaginationItem>
				)}

				{currentPage + 2 <= pages.length && (
					<PaginationItem>
						<PaginationLink
							onClick={handleNextPage2}
							className='cursor-pointer select-none'
						>
							{currentPage + 2}
						</PaginationLink>
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						className='cursor-pointer select-none'
						onClick={() => {
							handleNextPage()
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
