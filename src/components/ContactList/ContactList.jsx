import PropTypes from 'prop-types';
import { List, ListButton, ListWrapper } from './ContactList.styled';

export const ContactList = ({ contacts, onRemoveContact }) => {
	return (
		<ListWrapper>
			<List>
				{contacts.map(contact => (
					<li key={contact.id}>
						<p>
							{contact.name}: {contact.number}
						</p>
						<ListButton type="button" onClick={() => onRemoveContact(contact.id)}>
							Delete
						</ListButton>
					</li>
				))}
			</List>
		</ListWrapper>
	)
}

ContactList.prototype = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		})
	).isRequired,
	onRemoveContact: PropTypes.func.isRequired,
};