import PropTypes from 'prop-types';
import { FilterForm, FilterTitle } from './Filter.styled';

export const Filter = ({filter, onFilterChange }) => {
	return (
		<>
			<FilterForm>
				<FilterTitle>
					<span>Find contact by name</span>
					<input
						type="text"
						value={filter}
						onChange={onFilterChange}
					/>
				</FilterTitle>
			</FilterForm>
		</>
	)
}

Filter.propTypes = {
	onFilterChange: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,

};